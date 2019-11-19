using OmahaMTG._05_Data;

namespace OmahaMTG._00_Model.Admin.Model.Presenter
{
    public class PresenterQueryRequest : SkipTakeRequest
    {
        public string Filter { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}