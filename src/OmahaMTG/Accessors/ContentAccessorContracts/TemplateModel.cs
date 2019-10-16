using System;
using OmahaMTG.Data;

namespace OmahaMTG.Accessors.ContentAccessorContracts
{

        public class TemplateModel
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Body { get; set; }

            public bool IsDeleted { get; set; }
    }

        public class TemplateCreateRequest
    {
            public string Name { get; set; }
            public string Body { get; set; }

        }

        public class TemplateUpdateRequest
    {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Body { get; set; }

        }

        public class TemplateDeleteRequest
    {
            public int Id { get; set; }
            public bool Perm { get; set; }
        }

        public class TemplateQueryRequest : SkipTakeRequest
        {
            public String Filter { get; set; }
            public bool IncludeDeleted { get; set; }
        }
    
}