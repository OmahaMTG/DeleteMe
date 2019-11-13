using System;
using OmahaMTG.Data;

namespace OmahaMTG._01_Managers.Admin.Model.Sponsor
{
    public class SponsorQueryRequest : SkipTakeRequest
    {
        public String Filter { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}