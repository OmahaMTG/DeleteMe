using System;
using System.Collections.Generic;

namespace OmahaMTG._00_Model.Admin.Model.Meeting
{
    public class MeetingModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int? TemplateId { get; set; }
        public DateTime? PublishStartTime { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }


        public bool IsDraft { get; set; }
        public bool IsDeleted { get; set; }

        public IEnumerable<string> Tags { get; set; }
        public string VimeoId { get; set; }
        public IEnumerable<MeetingSponsor> MeetingSponsors { get; set; }
        public int? MeetingHostId { get; set; }
        public string MeetingHostBody { get; set; }

        public IEnumerable<MeetingPresentation> MeetingPresentations { get; set; }
    }
}