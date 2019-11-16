using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OmahaMTG._05_Data
{
    [Table("Presentations")]
    internal class PresentationData : DataEntityBase
    {
        public string Title { get; set; }
        public string Details { get; set; }
        public MeetingData Meeting { get; set; }
        public int? MeetingId { get; set; }
        public ICollection<PresentationPresenterData> PresentationPresenters { get; set; }
        public bool IsDeleted { get; set; }
        public string VimeoId { get; set; }
    }
}