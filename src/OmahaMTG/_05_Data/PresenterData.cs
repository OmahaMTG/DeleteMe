using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OmahaMTG._05_Data
{
    [Table("Presenters")]
    internal class PresenterData : DataEntityBase
    {
        public string Name { get; set; }
        public string Bio { get; set; }
        public string ContactInfo { get; set; }

        public string OmahaMtgUserId { get; set; }
        public ICollection<PresentationPresenterData> PresentationPresenters { get; set; }
        public bool IsDeleted { get; set; }
    }
}