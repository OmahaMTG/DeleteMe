using System;
using System.Collections.Generic;
using OmahaMTG.Data;

namespace OmahaMTG._01_Models
{
    public class PostModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime? PublishStartTime { get; set; }
        public bool IsDraft { get; set; }
        public bool IsDeleted { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }

    public class PostCreateRequest
    {
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime? PublishStartTime { get; set; }
        public bool IsDraft { get; set; }
        public bool IsDeleted { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }

    public class PostUpdateRequest
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime? PublishStartTime { get; set; }
        public bool IsDraft { get; set; }
        public bool IsDeleted { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }

    public class PostDeleteRequest
    {
        public int Id { get; set; }
        public bool Perm { get; set; }
    }

    public class PostGetRequest
    {
        public int Id { get; set; }
    }

    public class PostQueryRequest : SkipTakeRequest
    {
        public String Filter { get; set; }
        public bool IncludeDrafts { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}