namespace OmahaMTG._01_Managers.Admin.Model.Presenter
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
}