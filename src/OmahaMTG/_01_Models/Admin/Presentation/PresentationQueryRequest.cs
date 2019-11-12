using OmahaMTG.Data;

namespace OmahaMTG._01_Models.Admin.Presentation
{
    public class PresentationQueryRequest : SkipTakeRequest
    {
        public string Filter { get; set; }
        public int? MeetingId { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}