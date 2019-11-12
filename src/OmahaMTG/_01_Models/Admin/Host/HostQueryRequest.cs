using OmahaMTG.Data;
using System;

namespace OmahaMTG._01_Models.Admin.Host
{
    public class HostQueryRequest : SkipTakeRequest
    {
        public String Filter { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}