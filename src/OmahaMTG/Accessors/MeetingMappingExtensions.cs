using System;
using System.Linq;
using OmahaMTG._01_Models;
using OmahaMTG.Accessors.ContentAccessorContracts;
using OmahaMTG.Data;

namespace OmahaMTG.Accessors
{
    internal static class MeetingMappingExtensions
    {
        internal static MeetingData ToMeetingData(this MeetingCreateRequest createMeetingRequest)
        {
            return new MeetingData()
            {
                Body = createMeetingRequest.Body,
                IsDraft = createMeetingRequest.IsDraft,
                PublishStartTime = createMeetingRequest.PublishStartTime ?? DateTime.Now,
                Title = createMeetingRequest.Title,
                StartTime = createMeetingRequest.StartTime,
                EndTime = createMeetingRequest.EndTime,
                MeetingSponsors = createMeetingRequest.SponsorIds.Select(s => new MeetingSponsorData() { SponsorId = s }).ToList(),
                MeetingHostId = createMeetingRequest.HostId,
                MeetingTags = createMeetingRequest.Tags.Select(s => new MeetingTagData() { Tag = new TagData() { Name = s } }).ToList(),
                VimeoId = createMeetingRequest.VimeoId

            };

        }

        internal static MeetingModel ToMeeting(this MeetingData meetingData)
        {
            return new MeetingModel()
            {
                Id = meetingData.Id,
                Body = meetingData.Body,
                IsDraft = meetingData.IsDraft,
                PublishStartTime = meetingData.PublishStartTime ?? DateTime.Now,
                Title = meetingData.Title,
                StartTime = meetingData.StartTime,
                EndTime = meetingData.EndTime,
                //Host = meetingData.MeetingHost?.ToHost(),
                //Sponsors = meetingData.MeetingSponsors?.Select(ms => ms.Sponsor.ToSponsor()).ToList(),
                IsDeleted = meetingData.IsDeleted,
                //PresentationIds = meetingData.Presentations?.Select(_ => _.pre),
                HostId = meetingData.MeetingHostId,
                SponsorIds = meetingData.MeetingSponsors?.Select(ms => ms.SponsorId),
                PresentationIds = meetingData.Presentations?.Select(p => p.Id),
                Tags = meetingData.MeetingTags?.Select(s => s.Tag.Name),
                VimeoId = meetingData.VimeoId

            };
        }

        internal static void ApplyUpdateMeetingRequestToMeetingData(this MeetingData meetingDataToUpdate, MeetingUpdateRequest updateMeetingRequest)
        {
            meetingDataToUpdate.Body = updateMeetingRequest.Body;
            meetingDataToUpdate.IsDraft = updateMeetingRequest.IsDraft;
            meetingDataToUpdate.PublishStartTime = updateMeetingRequest.PublishStartTime;
            meetingDataToUpdate.Title = updateMeetingRequest.Title;
            meetingDataToUpdate.StartTime = updateMeetingRequest.StartTime;
            meetingDataToUpdate.EndTime = updateMeetingRequest.EndTime;
            meetingDataToUpdate.MeetingHostId = updateMeetingRequest.HostId;
            // meetingDataToUpdate.MeetingSponsors = updateMeetingRequest.SponsorIds.Select(s => new MeetingSponsorData() { SponsorId = s });
            meetingDataToUpdate.MeetingTags = updateMeetingRequest.Tags
                .Select(s => new MeetingTagData() { Tag = new TagData() { Name = s } }).ToList();
            meetingDataToUpdate.VimeoId = updateMeetingRequest.VimeoId;
        }

        //internal static IEnumerable<MeetingModel> ToMeetings(this IEnumerable<MeetingData> meetingDatas)
        //{
        //    return meetingDatas.Select(u => u.ToMeeting());
        //}
    }
}