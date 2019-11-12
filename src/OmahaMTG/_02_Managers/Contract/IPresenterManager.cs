using OmahaMTG._01_Models.Admin.Presenter;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG._02_Managers.Contract
{
    public interface IPresenterManager
    {
        Task<PresenterModel> CreatePresenter(PresenterCreateRequest request);
        Task<PresenterModel> UpdatePresenter(PresenterUpdateRequest request);
        Task DeletePresenter(PresenterDeleteRequest request);
        Task<SkipTakeSet<PresenterModel>> QueryPresenter(PresenterQueryRequest request);
        Task<PresenterModel> GetPresenter(PresenterGetRequest request);
    }
}