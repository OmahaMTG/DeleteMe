using OmahaMTG.Data;
using System;

namespace OmahaMTG._01_Models.Admin.Template
{
    public class TemplateQueryRequest : SkipTakeRequest
    {
        public String Filter { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}