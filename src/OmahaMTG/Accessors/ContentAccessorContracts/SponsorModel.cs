using OmahaMTG.Data;
using System;

namespace OmahaMTG.Accessors.ContentAccessorContracts
{
    public class SponsorModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Blurb { get; set; }
        public string ContactInfo { get; set; }
        public string ShortBlurb { get; set; }
        public string Url { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class SponsorCreateRequest
    {
        public string Name { get; set; }
        public string Blurb { get; set; }
        public string ContactInfo { get; set; }
        public string ShortBlurb { get; set; }
        public string Url { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class SponsorUpdateRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Blurb { get; set; }
        public string ContactInfo { get; set; }
        public string ShortBlurb { get; set; }
        public string Url { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class SponsorDeleteRequest
    {
        public int Id { get; set; }
        public bool Perm { get; set; }
    }

    public class SponsorQueryRequest : SkipTakeRequest
    {
        public String Filter { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}