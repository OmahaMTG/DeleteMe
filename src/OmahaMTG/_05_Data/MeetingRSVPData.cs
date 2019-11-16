using System.ComponentModel.DataAnnotations.Schema;

namespace OmahaMTG._05_Data
{
    [Table("MeetingRSVPs")]
    internal class MeetingRsvpData
    {
        public string UserId { get; set; }

        public int MeetingId { get; set; }
        public MeetingData Meeting { get; set; }
    }
}