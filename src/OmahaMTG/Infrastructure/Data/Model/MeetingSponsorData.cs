using System.ComponentModel.DataAnnotations.Schema;

namespace OmahaMTG.Infrastructure.Data.Model
{
    [Table("Meeting_Sponsors")]
    internal class MeetingSponsorData
    {
        public int MeetingId { get; set; }
        public MeetingData Meeting { get; set; }
        public int? SponsorId { get; set; }
        public SponsorData Sponsor { get; set; }

        public string MeetingSponsorBody { get; set; }
    }
}