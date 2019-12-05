using System.ComponentModel.DataAnnotations.Schema;

namespace OmahaMTG.Infrastructure.Data.Model
{
    [Table("Presentations_Presenters")]
    internal class PresentationPresenterData
    {
        public int PresentationId { get; set; }
        public PresentationData Presentation { get; set; }
        public int? PresenterId { get; set; }
        public PresenterData Presenter { get; set; }

        public string PresenterPresentationBody { get; set; }
    }
}