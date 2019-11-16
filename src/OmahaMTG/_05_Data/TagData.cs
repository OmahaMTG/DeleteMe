using System.ComponentModel.DataAnnotations.Schema;

namespace OmahaMTG._05_Data
{
    [Table("Tags")]
    internal class TagData : DataEntityBase
    {
        public string Name { get; set; }
    }
}