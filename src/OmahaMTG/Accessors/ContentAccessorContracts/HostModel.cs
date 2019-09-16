using System;

namespace OmahaMTG.Accessors.ContentAccessorContracts
{
    public class HostModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Blurb { get; set; }
        public string Address { get; set; }
        public string ContactInfo { get; set; }

        public bool IsDeleted { get; set; }
    }

    public class HostCreateRequest
    {
        public string Name { get; set; }
        public string Blurb { get; set; }
        public string Address { get; set; }
        public string ContactInfo { get; set; }

        public bool IsDeleted { get; set; }
    }

    public class HostUpdateRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Blurb { get; set; }
        public string Address { get; set; }
        public string ContactInfo { get; set; }

        public bool IsDeleted { get; set; }
    }

    public class HostDeleteRequest
    {
        public int Id { get; set; }
        public bool Perm { get; set; }
    }

    public class HostQueryRequest
    {
        public String Filter { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}