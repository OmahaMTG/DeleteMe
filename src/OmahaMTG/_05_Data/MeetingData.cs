using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OmahaMTG._05_Data
{
    [Table("Meetings")]
    internal class MeetingData : DataEntityBase
    {
        public string Title { get; set; }
        public int? TemplateId { get; set; }
        public TemplateData Template { get; set; }
        public DateTime? PublishStartTime { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        public bool IsDraft { get; set; }

        public IEnumerable<MeetingTagData> MeetingTags { get; set; }

        public string VimeoId { get; set; }

        public HostData MeetingHost { get; set; }
        public int? MeetingHostId { get; set; }
        public string HostMeetingBody { get; set; }

        public string MeetingMarkdownBody { get; set; }
        public string MeetingHtmlBody { get; set; }
        public bool IsDeleted { get; set; }

        public IEnumerable<PresentationData> Presentations { get; set; }

        public IEnumerable<MeetingSponsorData> MeetingSponsors { get; set; }
    }
}