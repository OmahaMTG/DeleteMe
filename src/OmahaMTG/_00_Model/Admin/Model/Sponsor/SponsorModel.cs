namespace OmahaMTG._00_Model.Admin.Model.Sponsor
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
}