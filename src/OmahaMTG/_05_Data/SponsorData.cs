using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OmahaMTG._05_Data
{
    [Table("Sponsors")]
    internal class SponsorData : DataEntityBase
    {
        public string Name { get; set; }
        public string Blurb { get; set; }
        public string ContactInfo { get; set; }
        public ICollection<MeetingSponsorData> MeetingSponsors { get; set; }
        public ICollection<SiteSponsorData> SiteSponsors { get; set; }
        public bool IsDeleted { get; set; }
        public string Url { get; set; }
        public string ShortBlurb { get; set; }
    }
}