using OmahaMTG._01_Managers.Admin.Model.Presenter;
using OmahaMTG._03_Accessors.ContentAccessor.Contract;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG._03_Accessors.Content
{
    partial class ContentAccessor : IPresenterAccessor
    {
        public Task<PresenterModel> CreatePresenter(PresenterCreateRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<PresenterModel> UpdatePresenter(PresenterUpdateRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task DeletePresenter(PresenterDeleteRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<SkipTakeSet<PresenterModel>> QueryPresenter(PresenterQueryRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<PresenterModel> GetPresenter(PresenterGetRequest request)
        {
            throw new System.NotImplementedException();
        }
    }
}