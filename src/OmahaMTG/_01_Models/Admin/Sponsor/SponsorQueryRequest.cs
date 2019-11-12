using OmahaMTG.Data;
using System;

namespace OmahaMTG._01_Models.Admin.Sponsor
{
    public class SponsorQueryRequest : SkipTakeRequest
    {
        public String Filter { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}