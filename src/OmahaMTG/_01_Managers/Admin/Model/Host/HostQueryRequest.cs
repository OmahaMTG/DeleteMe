using System;
using OmahaMTG.Data;

namespace OmahaMTG._01_Managers.Admin.Model.Host
{
    public class HostQueryRequest : SkipTakeRequest
    {
        public String Filter { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}