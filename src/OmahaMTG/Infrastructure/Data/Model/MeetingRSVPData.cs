using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace OmahaMTG.Infrastructure.Data.Model
{
    [Table("MeetingRSVPs")]
    internal class MeetingRsvpData
    {
        public string UserId { get; set; }
        public IdentityUser User { get; set; }

        public int MeetingId { get; set; }
        public MeetingData Meeting { get; set; }
    }
}