namespace OmahaMTG._01_Models.Admin.Host
{

    public class HostUpdateRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Blurb { get; set; }
        public string Address { get; set; }
        public string ContactInfo { get; set; }

        public bool IsDeleted { get; set; }
    }




}