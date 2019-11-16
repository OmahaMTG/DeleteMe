using System.Collections.Generic;

namespace OmahaMTG._01_Managers.Admin.Model.Meeting
{
    public class MeetingPresentation
    {
        public int? PresentationId { get; set; }
        public string PresentationTitle { get; set; }

        public string PresentationDetails { get; set; }
        public string VimeoId { get; set; }

        public IEnumerable<MeetingPresentationPresenter> MeetingPresentationPresenters { get; set; }
    }
}