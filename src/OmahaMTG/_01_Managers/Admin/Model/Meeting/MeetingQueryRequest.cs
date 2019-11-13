using System;
using OmahaMTG.Data;

namespace OmahaMTG._01_Managers.Admin.Model.Meeting
{
    public class MeetingQueryRequest : SkipTakeRequest
    {
        public String Filter { get; set; }

        public bool IncludeDrafts { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}