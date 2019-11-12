using OmahaMTG.Data;
using System;

namespace OmahaMTG._01_Models.Admin.Post
{
    public class PostQueryRequest : SkipTakeRequest
    {
        public String Filter { get; set; }
        public bool IncludeDrafts { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}