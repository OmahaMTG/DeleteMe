using System.Collections.Generic;

namespace OmahaMTG._01_Models.Admin.Presentation
{
    public class PresentationUpdateRequest
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public IEnumerable<int> PresenterIds { get; set; }
    }
}