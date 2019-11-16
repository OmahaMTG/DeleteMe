using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OmahaMTG._05_Data
{
    [Table("Hosts")]
    internal class HostData : DataEntityBase
    {
        public string Name { get; set; }
        public string Blurb { get; set; }
        public string Address { get; set; }
        public string ContactInfo { get; set; }
        public IEnumerable<MeetingData> Meetings { get; set; }
        public bool IsDeleted { get; set; }
    }
}