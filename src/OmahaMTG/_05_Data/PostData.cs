using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OmahaMTG._05_Data
{
    [Table("Posts")]
    internal class PostData : DataEntityBase
    {
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime? PublishStartTime { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsDraft { get; set; }
        public IEnumerable<PostTagData> PostTags { get; set; }
    }
}