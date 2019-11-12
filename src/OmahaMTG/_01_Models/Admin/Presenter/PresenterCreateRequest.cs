namespace OmahaMTG._01_Models.Admin.Presenter
{
    public class PresenterCreateRequest
    {
        public string Name { get; set; }

        public string ContactInfo { get; set; }
        public string Bio { get; set; }
        public string OmahaMtgUserId { get; set; }
        public bool IsDeleted { get; set; }
    }
}