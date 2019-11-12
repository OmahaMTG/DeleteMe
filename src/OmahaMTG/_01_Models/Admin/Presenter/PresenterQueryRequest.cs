using OmahaMTG.Data;
using System;

namespace OmahaMTG._01_Models.Admin.Presenter
{
    public class PresenterQueryRequest : SkipTakeRequest
    {
        public String Filter { get; set; }
        public bool IncludeDeleted { get; set; }
    }
}