using System;
using System.Collections.Generic;
using OmahaMTG.Data;

namespace OmahaMTG._01_Models
{
    public class MeetingModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime? PublishStartTime { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public bool IsDraft { get; set; }
        public bool IsDeleted { get; set; }
        public int RsvpCount { get; set; }
        public IEnumerable<string> Tags { get; set; }
        public long? VimeoId { get; set; }
        public int? HostId { get; set; }
        public IEnumerable<int> SponsorIds { get; set; }
        public IEnumerable<int> PresentationIds { get; set; }
    }

    public class MeetingCreateRequest
    {
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime? PublishStartTime { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public bool IsDraft { get; set; }
        public bool IsDeleted { get; set; }
        public int RsvpCount { get; set; }
        public IEnumerable<string> Tags { get; set; }
        public long? VimeoId { get; set; }
        public int? HostId { get; set; }
        public IEnumerable<int> SponsorIds { get; set; }
        public IEnumerable<int> PresentationIds { get; set; }
    }

    public class MeetingUpdateRequest
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime? PublishStartTime { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public bool IsDraft { get; set; }
        public bool IsDeleted { get; set; }
        public int RsvpCount { get; set; }
        public IEnumerable<string> Tags { get; set; }
        public long? VimeoId { get; set; }
        public int? HostId { get; set; }
        public IEnumerable<int> SponsorIds { get; set; }
        public IEnumerable<int> PresentationIds { get; set; }
    }

    public class MeetingDeleteRequest
    {
        public int Id { get; set; }
        public bool Perm { get; set; }
    }

    public class MeetingGetRequest
    {
        public int Id { get; set; }
    }

    public class MeetingQueryRequest : SkipTakeRequest
    {
        public String Filter { get; set; }

        public bool IncludeDrafts { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}