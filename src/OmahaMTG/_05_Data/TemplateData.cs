using System.ComponentModel.DataAnnotations.Schema;

namespace OmahaMTG.Data
{


    [Table("Templates")]
    class TemplateData : DataEntityBase
    {
        public string Name { get; set; }
        
        public string Body { get; set; }
        public bool IsDeleted { get; set; }
    }
}