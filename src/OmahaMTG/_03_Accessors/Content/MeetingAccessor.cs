using Hero4Hire.Architecture;
using Microsoft.EntityFrameworkCore;
using OmahaMTG._00_Model.Admin.Model.Meeting;
using OmahaMTG._03_Accessors.Content.Contract;
using OmahaMTG._05_Data;
using System.Linq;
using System.Threading.Tasks;

namespace OmahaMTG._03_Accessors.Content
{
    internal partial class ContentAccessor : IMeetingAccessor
    {
        public async Task<Response<MeetingModel>> CreateMeeting(MeetingCreateRequest request)
        {
            var newMeeting = request.ToMeetingData();
            await _dbContext.Meetings.AddAsync(newMeeting);
            await _dbContext.SaveChangesAsync();

            return new Response<MeetingModel>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = (await _dbContext.Meetings
                .Include(i => i.MeetingSponsors).ThenInclude(i => i.Sponsor)
                .Include(i => i.MeetingHost)
                .Include(i => i.Presentations).ThenInclude(i => i.PresentationPresenters).ThenInclude(i => i.Presenter)
                .Include(_ => _.MeetingTags).ThenInclude(_ => _.Tag)
                .Where(w => w.Id == newMeeting.Id)
                .FirstOrDefaultAsync()).ToMeeting()
            };

        }

        public async Task<NullResponse> DeleteMeeting(MeetingDeleteRequest request)
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
                return new NullResponse() { Status = ResponseStatusCodes.OkNoContent };
            }

            return new NullResponse() { Status = ResponseStatusCodes.NotFound };
        }

        public async Task<Response<MeetingModel>> GetMeeting(MeetingGetRequest request)
        {
            var result = await _dbContext.Meetings
                .Include(i => i.MeetingSponsors).ThenInclude(i => i.Sponsor)
                .Include(i => i.MeetingHost)
                .Include(i => i.Presentations).ThenInclude(i => i.PresentationPresenters).ThenInclude(i => i.Presenter)
                .Include(_ => _.MeetingTags).ThenInclude(_ => _.Tag)
                .Where(w => w.Id == request.Id)
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return new Response<MeetingModel>() { Status = ResponseStatusCodes.NotFound };
            }

            return new Response<MeetingModel>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = result.ToMeeting()
            };
        }

        public async Task<Response<SkipTakeSet<MeetingModel>>> QueryMeeting(MeetingQueryRequest request)
        {
            var result = await _dbContext.Meetings
                .Include(i => i.MeetingSponsors).ThenInclude(i => i.Sponsor)
                .Include(i => i.MeetingHost)
                .Include(i => i.Presentations).ThenInclude(i => i.PresentationPresenters).ThenInclude(i => i.Presenter)
                .Include(_ => _.MeetingTags).ThenInclude(_ => _.Tag)
                .Where(p => string.IsNullOrWhiteSpace(request.Filter) || EF.Functions.Like(p.Title, $"%{request.Filter}%"))
                .AsSkipTakeSet(request.Skip, request.Take, d => d.ToMeeting());

            return new Response<SkipTakeSet<MeetingModel>>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = result
            };
        }

        public async Task<Response<MeetingModel>> UpdateMeeting(MeetingUpdateRequest request)
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

                return new Response<MeetingModel>()
                {
                    Status = ResponseStatusCodes.Ok,
                    Data = meetingToUpdate.ToMeeting()
                };
            }

            return new Response<MeetingModel>()
            {
                Status = ResponseStatusCodes.NotFound
            };
        }
    }
}

//        //#region Meeting
//        //public async Task<MeetingModel> CreateMeeting(MeetingCreateRequest request)
//        //{
//        //    var newMeeting = request.ToMeetingData();
//        //    await _dbContext.Meetings.AddAsync(newMeeting);
//        //    await _dbContext.SaveChangesAsync();
//        //    return (await _dbContext.Meetings
//        //        .Include(i => i.MeetingSponsors).ThenInclude(i => i.Sponsor)
//        //        .Include(i => i.MeetingHost)
//        //        .Include(i => i.Presentations).ThenInclude(i => i.PresentationPresenters).ThenInclude(i => i.Presenter)
//        //        .Include(_ => _.MeetingTags).ThenInclude(_ => _.Tag)
//        //        .Where(w => w.Id == newMeeting.Id)
//        //        .FirstOrDefaultAsync()).ToMeeting();
//        //}

//        //public async Task<MeetingModel> UpdateMeeting(MeetingUpdateRequest request)
//        //{
//        //    var meetingToUpdate = await _dbContext.Meetings
//        //        .Include(i => i.MeetingSponsors).ThenInclude(i => i.Sponsor)
//        //        .Include(i => i.MeetingHost)
//        //        .Include(i => i.Presentations).ThenInclude(i => i.PresentationPresenters).ThenInclude(i => i.Presenter)
//        //        .Include(_ => _.MeetingTags).ThenInclude(_ => _.Tag).FirstOrDefaultAsync(w => w.Id == request.Id);

//        //    if (meetingToUpdate != null)
//        //    {
//        //        meetingToUpdate.ApplyUpdateMeetingRequestToMeetingData(request);
//        //        await _dbContext.SaveChangesAsync();
//        //    }

//        //    return meetingToUpdate.ToMeeting();
//        //}

//        //public async Task DeleteMeeting(MeetingDeleteRequest request)
//        //{
//        //    var meetingFromDatabase = await _dbContext.Meetings.FirstOrDefaultAsync(w => w.Id == request.Id);
//        //    if (meetingFromDatabase != null)
//        //    {
//        //        if (request.Perm)
//        //        {

//        //            _dbContext.Meetings.Remove(meetingFromDatabase);
//        //        }
//        //        else
//        //        {
//        //            meetingFromDatabase.IsDeleted = true;
//        //        }
//        //        await _dbContext.SaveChangesAsync();
//        //    }

//        //}

//        //public async Task<SkipTakeSet<MeetingModel>> QueryMeeting(MeetingQueryRequest request)
//        //{
//        //    var result = await
//        //        _dbContext.Meetings
//        //            .Include(i => i.MeetingSponsors).ThenInclude(i => i.Sponsor)
//        //            .Include(i => i.MeetingHost)
//        //            .Include(i => i.Presentations).ThenInclude(i => i.PresentationPresenters)
//        //            .ThenInclude(i => i.Presenter)
//        //            .Include(_ => _.MeetingTags).ThenInclude(_ => _.Tag)
//        //            .Where(p => request.IncludeDeleted || !p.IsDeleted)
//        //            .Where(p => request.IncludeDrafts || !p.IsDraft)
//        //            .Where(p => string.IsNullOrWhiteSpace(request.Filter) ||
//        //                        EF.Functions.Like(p.Title, $"%{request.Filter}%"))
//        //            .AsSkipTakeSet(request.Skip, request.Take, d => d.ToMeeting());

//        //    return result;
//        //}