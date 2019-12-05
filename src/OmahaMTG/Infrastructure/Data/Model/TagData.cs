using System.ComponentModel.DataAnnotations.Schema;

namespace OmahaMTG.Infrastructure.Data.Model
{
    [Table("Tags")]
    internal class TagData : DataEntityBase
    {
        public string Name { get; set; }
    }
}