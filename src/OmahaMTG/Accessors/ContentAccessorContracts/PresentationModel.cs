using OmahaMTG.Data;
using System;
using System.Collections.Generic;

namespace OmahaMTG.Accessors.ContentAccessorContracts
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

    public class PresentationQueryRequest : SkipTakeRequest
    {
        public string Filter { get; set; }
        public int? MeetingId { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}