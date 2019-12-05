using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace OmahaMTG.Infrastructure.Data.Model
{
    [Table("SiteSponsors")]
    internal class SiteSponsorData : DataEntityBase
    {
        public SponsorData Sponsor { get; set; }
        public int SponsorId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}