using System.Collections.Generic;
using OmahaMTG.Data;

namespace OmahaMTG._01_Models
{
    public class PresentationModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public IEnumerable<int> PresenterIds { get; set; }
    }

    public class PresentationCreateRequest
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public IEnumerable<int> PresenterIds { get; set; }
    }

    public class PresentationUpdateRequest
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public IEnumerable<int> PresenterIds { get; set; }
    }

    public class PresentationDeleteRequest
    {
        public int Id { get; set; }
        public bool Perm { get; set; }
    }

    public class PresentationGetRequest
    {
        public int Id { get; set; }
    }

    public class PresentationQueryRequest : SkipTakeRequest
    {
        public string Filter { get; set; }
        public int? MeetingId { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}