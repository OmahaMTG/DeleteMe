using System;
using OmahaMTG.Data;

namespace OmahaMTG._01_Managers.Admin.Model.Template
{
    public class TemplateQueryRequest : SkipTakeRequest
    {
        public String Filter { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}