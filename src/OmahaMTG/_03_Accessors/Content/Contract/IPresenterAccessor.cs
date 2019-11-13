using OmahaMTG._01_Managers.Admin.Model.Presenter;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG._03_Accessors.ContentAccessor.Contract
{
    public interface IPresenterAccessor
    {
        Task<PresenterModel> CreatePresenter(PresenterCreateRequest request);
        Task<PresenterModel> UpdatePresenter(PresenterUpdateRequest request);
        Task DeletePresenter(PresenterDeleteRequest request);
        Task<SkipTakeSet<PresenterModel>> QueryPresenter(PresenterQueryRequest request);
        Task<PresenterModel> GetPresenter(PresenterGetRequest request);
    }
}