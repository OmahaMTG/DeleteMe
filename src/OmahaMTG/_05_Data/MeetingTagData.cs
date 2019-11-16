using System.ComponentModel.DataAnnotations.Schema;

namespace OmahaMTG._05_Data
{
    [Table("MeetingTag")]
    internal class MeetingTagData
    {
        public int TagId { get; set; }
        public TagData Tag { get; set; }
        public int MeetingId { get; set; }
        public MeetingData Meeting { get; set; }
    }
}