using OmahaMTG._01_Managers.Admin.Model.Meeting;
using OmahaMTG._05_Data;
using System;
using System.Linq;

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
                MeetingSponsors = createMeetingRequest.MeetingSponsors?.Select(s => new MeetingSponsorData() { SponsorId = s.SponsorId, SponsorMeetingBody = s.SponsorMeetingBody }).ToList(),
                MeetingHostId = createMeetingRequest.MeetingHostId,
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
                PresenterMeetingBody = presenter.MeetingBody
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
                IsDeleted = meetingData.IsDeleted,
                MeetingHostId = meetingData.MeetingHostId,
                MeetingHostBody = meetingData.HostMeetingBody,
                MeetingSponsors = meetingData.MeetingSponsors?.Select(ms => new MeetingSponsor() { SponsorId = ms.SponsorId, SponsorMeetingBody = ms.SponsorMeetingBody }),
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
                MeetingBody = presenterData.PresenterMeetingBody
            };
        }

        //    internal static void ApplyUpdateMeetingRequestToMeetingData(this MeetingData meetingDataToUpdate, MeetingUpdateRequest updateMeetingRequest)
        //    {
        //        meetingDataToUpdate.Body = updateMeetingRequest.Body;
        //        meetingDataToUpdate.IsDraft = updateMeetingRequest.IsDraft;
        //        meetingDataToUpdate.PublishStartTime = updateMeetingRequest.PublishStartTime;
        //        meetingDataToUpdate.Title = updateMeetingRequest.Title;
        //        meetingDataToUpdate.StartTime = updateMeetingRequest.StartTime;
        //        meetingDataToUpdate.EndTime = updateMeetingRequest.EndTime;
        //        meetingDataToUpdate.MeetingHostId = updateMeetingRequest.HostId;
        //        // meetingDataToUpdate.MeetingSponsors = updateMeetingRequest.SponsorIds.Select(s => new MeetingSponsorData() { SponsorId = s });
        //        meetingDataToUpdate.MeetingTags = updateMeetingRequest.Tags
        //            .Select(s => new MeetingTagData() { Tag = new TagData() { Name = s } }).ToList();
        //        meetingDataToUpdate.VimeoId = updateMeetingRequest.VimeoId;
        //    }

        //    //internal static IEnumerable<MeetingModel> ToMeetings(this IEnumerable<MeetingData> meetingDatas)
        //    //{
        //    //    return meetingDatas.Select(u => u.ToMeeting());
        //    //}
    }
}

