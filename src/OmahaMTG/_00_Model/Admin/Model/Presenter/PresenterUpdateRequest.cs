namespace OmahaMTG._00_Model.Admin.Model.Presenter
{
    public class PresenterUpdateRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string ContactInfo { get; set; }
        public string Bio { get; set; }
        public string OmahaMtgUserId { get; set; }
        public bool IsDeleted { get; set; }
    }
}