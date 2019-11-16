using OmahaMTG._05_Data;

namespace OmahaMTG._01_Managers.Admin.Model.Host
{
    public class HostQueryRequest : SkipTakeRequest
    {
        public string Filter { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}