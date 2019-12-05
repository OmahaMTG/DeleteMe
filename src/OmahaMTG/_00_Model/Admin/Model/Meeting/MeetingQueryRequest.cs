using OmahaMTG.Infrastructure.Data;

namespace OmahaMTG._00_Model.Admin.Model.Meeting
{
    public class MeetingQueryRequest : SkipTakeRequest
    {
        public string Filter { get; set; }

        public bool IncludeDrafts { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}