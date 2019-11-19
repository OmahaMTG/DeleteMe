using OmahaMTG._05_Data;

namespace OmahaMTG._00_Model.Admin.Model.Template
{
    public class TemplateQueryRequest : SkipTakeRequest
    {
        public string Filter { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}