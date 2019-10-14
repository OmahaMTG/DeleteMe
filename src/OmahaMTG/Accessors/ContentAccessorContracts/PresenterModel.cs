using OmahaMTG.Data;
using System;

namespace OmahaMTG.Accessors.ContentAccessorContracts
{
    public class PresenterModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Bio { get; set; }
        public string ContactInfo { get; set; }
        public string OmahaMtgUserId { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class PresenterCreateRequest
    {
        public string Name { get; set; }

        public string ContactInfo { get; set; }
        public string Bio { get; set; }
        public string OmahaMtgUserId { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class PresenterUpdateRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string ContactInfo { get; set; }
        public string Bio { get; set; }
        public string OmahaMtgUserId { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class PresenterDeleteRequest
    {
        public int Id { get; set; }
        public bool Perm { get; set; }
    }

    public class PresenterQueryRequest : SkipTakeRequest
    {
        public String Filter { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}