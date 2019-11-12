using System.Collections.Generic;

namespace OmahaMTG._01_Models.Admin.Meeting
{
    public class MeetingPresentation
    {
        public int? SponsorId { get; set; }
        public string PresentationTitle { get; set; }

        public string PresentationDetails { get; set; }
        public long? VimeoId { get; set; }

        public IEnumerable<MeetingPresentationPresenter> MeetingPresentationPresenters { get; set; }
    }
}