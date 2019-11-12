using System;
using System.Collections.Generic;

namespace OmahaMTG._01_Models.Admin.Meeting
{
    public class MeetingModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int TemplateId { get; set; }
        public DateTime? PublishStartTime { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        public string Body { get; set; }

        public bool IsDraft { get; set; }
        public bool IsDeleted { get; set; }

        public IEnumerable<string> Tags { get; set; }
        public long? VimeoId { get; set; }
        public IEnumerable<MeetingSponsor> MeetingSponsors { get; set; }
        public MeetingHost MeetingHost { get; set; }

        public IEnumerable<MeetingPresentation> MeetingPresentations { get; set; }
    }
}