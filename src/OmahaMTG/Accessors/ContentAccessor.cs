using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OmahaMTG.Accessors.ContentAccessorContracts;
using OmahaMTG.Data;

namespace OmahaMTG.Accessors
{
    class ContentAccessor : IHostAccessor, IMeetingAccessor, IPostAccessor, IPresentationAccessor, IPresenterAccessor, ISponsorAccessor, ITemplateAccessor
    {
        private readonly UserGroupContext _dbContext;
        public ContentAccessor(UserGroupContext dbContext)
        {
            _dbContext = dbContext;
        }

        #region Host
        public async Task<HostModel> CreateHost(HostCreateRequest request)
        {
            var newRecord = request.ToHostData();
            _dbContext.Hosts.Add(newRecord);
            await _dbContext.SaveChangesAsync();
            return newRecord.ToHost();
        }

        public async Task<HostModel> UpdateHost(HostUpdateRequest request)
        {
            var hostToUpdate = await _dbContext.Hosts.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (hostToUpdate != null)
            {
                hostToUpdate.ApplyUpdateHostRequestToHostData(request);
                await _dbContext.SaveChangesAsync();
            }

            return hostToUpdate.ToHost();
        }

        public async Task DeleteHost(HostDeleteRequest request)
        {
            var hostFromDatabase = await _dbContext.Hosts.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (hostFromDatabase != null)
            {
                if (request.Perm)
                {
                    _dbContext.Hosts.Remove(hostFromDatabase);
                }
                else
                {
                    hostFromDatabase.IsDeleted = true;
                }
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<SkipTakeSet<HostModel>> QueryHost(HostQueryRequest request)
        {
            var result = (await _dbContext.Hosts
                .Where(p => request.IncludeDeleted || !p.IsDeleted)
                .Where(p => string.IsNullOrWhiteSpace(request.Filter) || EF.Functions.Like(p.Name, $"%{request.Filter}%"))
                .OrderBy(p => p.Name)
                .ThenBy(p => p.CreatedDate)
                .AsSkipTakeSet(request.Skip, request.Take, d => d.ToHost()));

            return result;
        }
        #endregion

        #region Meeting
        public async Task<MeetingModel> CreateMeeting(MeetingCreateRequest request)
        {
            var newMeeting = request.ToMeetingData();
            await _dbContext.Meetings.AddAsync(newMeeting);
            await _dbContext.SaveChangesAsync();
            return (await _dbContext.Meetings
                .Include(i => i.MeetingSponsors).ThenInclude(i => i.Sponsor)
                .Include(i => i.MeetingHost)
                .Include(i => i.Presentations).ThenInclude(i => i.PresentationPresenters).ThenInclude(i => i.Presenter)
                .Include(_ => _.MeetingTags).ThenInclude(_ => _.Tag)
                .Where(w => w.Id == newMeeting.Id)
                .FirstOrDefaultAsync()).ToMeeting();
        }

        public async Task<MeetingModel> UpdateMeeting(MeetingUpdateRequest request)
        {
            var meetingToUpdate = await _dbContext.Meetings
                .Include(i => i.MeetingSponsors).ThenInclude(i => i.Sponsor)
                .Include(i => i.MeetingHost)
                .Include(i => i.Presentations).ThenInclude(i => i.PresentationPresenters).ThenInclude(i => i.Presenter)
                .Include(_ => _.MeetingTags).ThenInclude(_ => _.Tag).FirstOrDefaultAsync(w => w.Id == request.Id);

            if (meetingToUpdate != null)
            {
                meetingToUpdate.ApplyUpdateMeetingRequestToMeetingData(request);
                await _dbContext.SaveChangesAsync();
            }

            return meetingToUpdate.ToMeeting();
        }

        public async Task DeleteMeeting(MeetingDeleteRequest request)
        {
            var meetingFromDatabase = await _dbContext.Meetings.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (meetingFromDatabase != null)
            {
                if (request.Perm)
                {

                    _dbContext.Meetings.Remove(meetingFromDatabase);
                }
                else
                {
                    meetingFromDatabase.IsDeleted = true;
                }
                await _dbContext.SaveChangesAsync();
            }

        }

        public async Task<SkipTakeSet<MeetingModel>> QueryMeeting(MeetingQueryRequest request)
        {
            var result = await
                _dbContext.Meetings
                    .Include(i => i.MeetingSponsors).ThenInclude(i => i.Sponsor)
                    .Include(i => i.MeetingHost)
                    .Include(i => i.Presentations).ThenInclude(i => i.PresentationPresenters)
                    .ThenInclude(i => i.Presenter)
                    .Include(_ => _.MeetingTags).ThenInclude(_ => _.Tag)
                    .Where(p => request.IncludeDeleted || !p.IsDeleted)
                    .Where(p => request.IncludeDrafts || !p.IsDraft)
                    .Where(p => string.IsNullOrWhiteSpace(request.Filter) ||
                                EF.Functions.Like(p.Title, $"%{request.Filter}%"))
                    .AsSkipTakeSet(request.Skip, request.Take, d => d.ToMeeting());

            return result;
        }

        #endregion

        #region Post

        public async Task<PostModel> CreatePost(PostCreateRequest request)
        {
            var newRecord = request.ToPostData();
            _dbContext.Posts.Add(newRecord);
            await _dbContext.SaveChangesAsync();
            return newRecord.ToPost();
        }

        public async Task<PostModel> UpdatePost(PostUpdateRequest request)
        {
            var postToUpdate = await _dbContext.Posts.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (postToUpdate != null)
            {
                postToUpdate.ApplyUpdatePostRequestToPostData(request);

                await _dbContext.SaveChangesAsync();
            }

            return postToUpdate.ToPost();
        }

        public async Task DeletePost(PostDeleteRequest request)
        {
            var postToDelete = await _dbContext.Posts.FirstOrDefaultAsync(w => w.Id == request.Id);

            if (postToDelete != null)
            {
                if (request.Perm)
                {
                    _dbContext.Posts.Remove(postToDelete);
                }
                else
                {
                    postToDelete.IsDeleted = true;
                }
                await _dbContext.SaveChangesAsync();

            }
        }

        public async Task<SkipTakeSet<PostModel>> QueryPost(PostQueryRequest request)
        {
            var result = (await _dbContext.Posts
                .Include(_ => _.PostTags).ThenInclude(_ => _.Tag)
                .Where(p => request.IncludeDrafts || !p.IsDraft)
                .Where(p => request.IncludeDeleted || !p.IsDeleted)
                .Where(p => string.IsNullOrWhiteSpace(request.Filter) || EF.Functions.Like(p.Title, $"%{request.Filter}%") || EF.Functions.Like(p.Body, $"%{request.Filter}%"))
                //.Where(p => p.PublishStartTime <= DateTime.Now)
                .OrderBy(p => p.PublishStartTime)
                .ThenBy(p => p.CreatedDate)
                .AsSkipTakeSet(request.Skip, request.Take, d => d.ToPost()));

            return result;
        }

        #endregion

        #region Presentation
        public async Task<PresentationModel> CreatePresentation(PresentationCreateRequest request)
        {
            var newRecord = request.ToPresentationData();
            _dbContext.Presentations.Add(newRecord);
            await _dbContext.SaveChangesAsync();
            return newRecord.ToPresentation();
        }

        public async Task<PresentationModel> UpdatePresentation(PresentationUpdateRequest request)
        {
            var presentationToUpdate = await _dbContext.Presentations.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (presentationToUpdate != null)
            {
                presentationToUpdate.ApplyUpdatePresentationRequestToPresentationData(request);

                await _dbContext.SaveChangesAsync();
            }

            return presentationToUpdate.ToPresentation();
        }

        public async Task DeletePresentation(PresentationDeleteRequest request)
        {
            var presentationToDelete = await _dbContext.Presentations.FirstOrDefaultAsync(w => w.Id == request.Id);

            if (presentationToDelete != null)
            {
                if (request.Perm)
                {
                    _dbContext.Presentations.Remove(presentationToDelete);
                }
                else
                {
                    presentationToDelete.IsDeleted = true;
                }
                await _dbContext.SaveChangesAsync();

            }
        }

        public async Task<SkipTakeSet<PresentationModel>> QueryPresentation(PresentationQueryRequest request)
        {
            var result = (await _dbContext.Presentations
                .Include(_ => _.PresentationPresenters)
                .Where(_ => request.IncludeDeleted || !_.IsDeleted)
                .Where(_ => string.IsNullOrWhiteSpace(request.Filter) || EF.Functions.Like(_.Title, $"%{request.Filter}%") || EF.Functions.Like(_.Details, $"%{request.Filter}%"))
                .Where(_ => !request.MeetingId.HasValue || _.MeetingId == request.MeetingId.Value)
                .OrderBy(_ => _.CreatedDate)
                .AsSkipTakeSet(request.Skip, request.Take, d => d.ToPresentation()));

            return result;
        }
        #endregion

        #region Presenter
        public async Task<PresenterModel> CreatePresenter(PresenterCreateRequest request)
        {
            var newRecord = request.ToPresenterData();
            _dbContext.Presenters.Add(newRecord);
            await _dbContext.SaveChangesAsync();
            return newRecord.ToPresenter();
        }

        public async Task<PresenterModel> UpdatePresenter(PresenterUpdateRequest request)
        {
            var presenterToUpdate = await _dbContext.Presenters.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (presenterToUpdate != null)
            {
                presenterToUpdate.ApplyUpdatePresenterRequestToPresenterData(request);

                await _dbContext.SaveChangesAsync();
            }

            return presenterToUpdate.ToPresenter();
        }

        public async Task DeletePresenter(PresenterDeleteRequest request)
        {
            var presenterToDelete = await _dbContext.Presenters.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (presenterToDelete != null)
            {
                if (request.Perm)
                {
                    _dbContext.Presenters.Remove(presenterToDelete);
                }
                else
                {
                    presenterToDelete.IsDeleted = true; ;
                }

                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<SkipTakeSet<PresenterModel>> QueryPresenter(PresenterQueryRequest request)
        {
            var result = (await _dbContext.Presenters
                .Where(p => request.IncludeDeleted || !p.IsDeleted)
                .Where(p => string.IsNullOrWhiteSpace(request.Filter) || EF.Functions.Like(p.Name, $"%{request.Filter}%"))
                .OrderBy(p => p.Name)
                .ThenBy(p => p.CreatedDate)
                .AsSkipTakeSet(request.Skip, request.Take, d => d.ToPresenter()));

            return result;
        }
        #endregion

        #region Sponsor

        public async Task<SponsorModel> CreateSponsor(SponsorCreateRequest request)
        {
            var newRecord = request.ToSponsorData();
            _dbContext.Sponsors.Add(newRecord);
            await _dbContext.SaveChangesAsync();
            return newRecord.ToSponsor();
        }

        public async Task<SponsorModel> UpdateSponsor(SponsorUpdateRequest request)
        {
            var sponsorToUpdate = await _dbContext.Sponsors.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (sponsorToUpdate != null)
            {
                sponsorToUpdate.ApplyUpdateSponsorRequestToSponsorData(request);
                await _dbContext.SaveChangesAsync();
            }

            return sponsorToUpdate.ToSponsor();
        }

        public async Task DeleteSponsor(SponsorDeleteRequest request)
        {
            var sponsorFromDatabase = await _dbContext.Sponsors.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (sponsorFromDatabase != null)
            {
                if (request.Perm)
                {
                    _dbContext.Sponsors.Remove(sponsorFromDatabase);
                }
                else
                {
                    sponsorFromDatabase.IsDeleted = true; ;
                }

                await _dbContext.SaveChangesAsync();
            }


        }

        public async Task<SkipTakeSet<SponsorModel>> QuerySponsor(SponsorQueryRequest request)
        {
            var result = (await _dbContext.Sponsors
                .Where(p => request.IncludeDeleted || !p.IsDeleted)
                .Where(p => string.IsNullOrWhiteSpace(request.Filter) || EF.Functions.Like(p.Name, $"%{request.Filter}%"))
                .OrderBy(p => p.Name)
                .ThenBy(p => p.CreatedDate)
                .AsSkipTakeSet(request.Skip, request.Take, d => d.ToSponsor()));

            return result;
        }

        #endregion

        public async Task<TemplateModel> CreateTemplate(TemplateCreateRequest request)
        {
            var newRecord = request.ToTemplateData();
            _dbContext.Templates.Add(newRecord);
            await _dbContext.SaveChangesAsync();
            return newRecord.ToTemplate();
        }

        public async Task<TemplateModel> UpdateTemplate(TemplateUpdateRequest request)
        {
            var templateToUpdate = await _dbContext.Templates.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (templateToUpdate != null)
            {
                templateToUpdate.ApplyUpdateTemplateRequestToTemplateData(request);
                await _dbContext.SaveChangesAsync();
            }

            return templateToUpdate.ToTemplate();
        }

        public async Task DeleteTemplate(TemplateDeleteRequest request)
        {
            var templateFromDatabase = await _dbContext.Templates.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (templateFromDatabase != null)
            {
                if (request.Perm)
                {
                    _dbContext.Templates.Remove(templateFromDatabase);
                }
                else
                {
                    templateFromDatabase.IsDeleted = true; ;
                }

                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<SkipTakeSet<TemplateModel>> QueryTemplate(TemplateQueryRequest request)
        {
            var result = (await _dbContext.Templates
                .Where(p => request.IncludeDeleted || !p.IsDeleted)
                .Where(p => string.IsNullOrWhiteSpace(request.Filter) || EF.Functions.Like(p.Name, $"%{request.Filter}%"))
                .OrderBy(p => p.Name)
                .ThenBy(p => p.CreatedDate)
                .AsSkipTakeSet(request.Skip, request.Take, d => d.ToTemplate()));

            return result;
        }
    }
}