using System.Threading.Tasks;
using OmahaMTG._00_Model.Admin.Model.Presenter;
using OmahaMTG._05_Data;

namespace OmahaMTG._01_Managers.Admin.Contract
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