using OmahaMTG._00_Model.Admin.Model.Meeting;
using System;
using System.Linq;
using OmahaMTG.Infrastructure.Data.Model;

namespace OmahaMTG._03_Accessors.Content
{
    internal static class MeetingMappingExtensions
    {
        internal static MeetingData ToMeetingData(this MeetingCreateRequest createMeetingRequest)
        {
            return new MeetingData()
            {
                IsDraft = createMeetingRequest.IsDraft,
                PublishStartTime = createMeetingRequest.PublishStartTime ?? DateTime.Now,
                Title = createMeetingRequest.Title,
                StartTime = createMeetingRequest.StartTime,
                EndTime = createMeetingRequest.EndTime,
                MeetingSponsors = createMeetingRequest.MeetingSponsors?.Select(s => new MeetingSponsorData() { SponsorId = s.SponsorId, MeetingSponsorBody = s.MeetingSponsorBody }).ToList(),
                MeetingHostId = createMeetingRequest.MeetingHostId,
                HostMeetingBody = createMeetingRequest.MeetingHostBody,
                MeetingTags = createMeetingRequest.Tags?.Select(s => new MeetingTagData() { Tag = new TagData() { Name = s } }).ToList(),
                VimeoId = createMeetingRequest.VimeoId,
                TemplateId = createMeetingRequest.TemplateId,
                Presentations = createMeetingRequest.MeetingPresentations?.Select(s => s.ToPresentationData()).ToList()
            };

        }

        private static PresentationData ToPresentationData(this MeetingPresentation meeting)
        {
            return new PresentationData()
            {
                VimeoId = meeting.VimeoId,
                Details = meeting.PresentationDetails,
                Title = meeting.PresentationTitle,
                PresentationPresenters = meeting.MeetingPresentationPresenters?.Select(s => s.ToPresentationPresenterData()).ToList()
            };
        }

        private static PresentationPresenterData ToPresentationPresenterData(this MeetingPresentationPresenter presenter)
        {
            return new PresentationPresenterData()
            {
                PresenterId = presenter.PresenterId,
                PresenterPresentationBody = presenter.MeetingPresentationPresenterBody
            };
        }

        internal static MeetingModel ToMeeting(this MeetingData meetingData)
        {
            return new MeetingModel()
            {
                Id = meetingData.Id,
                IsDraft = meetingData.IsDraft,
                PublishStartTime = meetingData.PublishStartTime ?? DateTime.Now,
                Title = meetingData.Title,
                StartTime = meetingData.StartTime,
                EndTime = meetingData.EndTime,
                TemplateId = meetingData.TemplateId,
                IsDeleted = meetingData.IsDeleted,
                MeetingHostId = meetingData.MeetingHostId,
                MeetingHostBody = meetingData.HostMeetingBody,
                MeetingSponsors = meetingData.MeetingSponsors?.Select(ms => new MeetingSponsor() { SponsorId = ms.SponsorId, MeetingSponsorBody = ms.MeetingSponsorBody }),
                MeetingPresentations = meetingData.Presentations.Select(s => s.ToPresentation()),
                Tags = meetingData.MeetingTags?.Select(s => s.Tag.Name),
                VimeoId = meetingData.VimeoId

            };
        }

        private static MeetingPresentation ToPresentation(this PresentationData presentationData)
        {
            return new MeetingPresentation()
            {
                VimeoId = presentationData.VimeoId,
                PresentationDetails = presentationData.Details,
                PresentationId = presentationData.Id,
                PresentationTitle = presentationData.Title,
                MeetingPresentationPresenters = presentationData.PresentationPresenters.Select(s => s.ToPresentationPresenter())

            };
        }

        private static MeetingPresentationPresenter ToPresentationPresenter(this PresentationPresenterData presenterData)
        {
            return new MeetingPresentationPresenter()
            {
                PresenterId = presenterData.PresenterId,
                MeetingPresentationPresenterBody = presenterData.PresenterPresentationBody
            };
        }

        internal static void ApplyUpdateMeetingRequestToMeetingData(this MeetingData meetingDataToUpdate, MeetingUpdateRequest updateMeetingRequest)
        {
            meetingDataToUpdate.MeetingMarkdownBody = updateMeetingRequest.MarkdownBody;
            meetingDataToUpdate.IsDraft = updateMeetingRequest.IsDraft;
            meetingDataToUpdate.PublishStartTime = updateMeetingRequest.PublishStartTime;
            meetingDataToUpdate.Title = updateMeetingRequest.Title;
            meetingDataToUpdate.StartTime = updateMeetingRequest.StartTime;
            meetingDataToUpdate.EndTime = updateMeetingRequest.EndTime;
            meetingDataToUpdate.MeetingHostId = updateMeetingRequest.MeetingHostId;
            meetingDataToUpdate.TemplateId = updateMeetingRequest.TemplateId;
            meetingDataToUpdate.HostMeetingBody = updateMeetingRequest.MeetingHostBody;
            // meetingDataToUpdate.MeetingSponsors = updateMeetingRequest.SponsorIds.Select(s => new MeetingSponsorData() { SponsorId = s });
            meetingDataToUpdate.MeetingTags = updateMeetingRequest.Tags
                .Select(s => new MeetingTagData() { Tag = new TagData() { Name = s } }).ToList();
            meetingDataToUpdate.VimeoId = updateMeetingRequest.VimeoId;

            meetingDataToUpdate.MeetingSponsors = updateMeetingRequest.MeetingSponsors?.Select(s =>
                new MeetingSponsorData() { SponsorId = s.SponsorId, MeetingSponsorBody = s.MeetingSponsorBody }).ToList();

            meetingDataToUpdate.Presentations = updateMeetingRequest.MeetingPresentations
                ?.Select(s => s.ToPresentationData()).ToList();
            //foreach (var currentSponsor in meetingDataToUpdate.MeetingSponsors)
            //{
            //    var isRemoved = true;
            //    foreach (var sponsorToAdd in updateMeetingRequest.MeetingSponsors)
            //    {
            //        if (currentSponsor.SponsorId == sponsorToAdd.SponsorId)
            //        {
            //            currentSponsor.MeetingSponsorBody = sponsorToAdd.MeetingSponsorBody;
            //            isRemoved = false;
            //        }

            //    }

            //    if (isRemoved)
            //    {
            //        meetingDataToUpdate.MeetingSponsors
            //    }
            //}
        }

    }
}

