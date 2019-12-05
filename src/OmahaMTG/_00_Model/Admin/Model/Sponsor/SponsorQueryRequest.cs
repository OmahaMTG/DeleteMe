using OmahaMTG.Infrastructure.Data;

namespace OmahaMTG._00_Model.Admin.Model.Sponsor
{
    public class SponsorQueryRequest : SkipTakeRequest
    {
        public string Filter { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}