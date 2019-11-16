using System.ComponentModel.DataAnnotations.Schema;

namespace OmahaMTG._05_Data
{
    [Table("Templates")]
    internal class TemplateData : DataEntityBase
    {
        public string Name { get; set; }

        public string Body { get; set; }
        public bool IsDeleted { get; set; }
    }
}