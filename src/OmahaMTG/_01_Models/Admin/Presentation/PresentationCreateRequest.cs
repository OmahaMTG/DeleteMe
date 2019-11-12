using System.Collections.Generic;

namespace OmahaMTG._01_Models.Admin.Presentation
{
    public class PresentationCreateRequest
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public IEnumerable<int> PresenterIds { get; set; }
    }
}