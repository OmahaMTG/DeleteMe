using System.Threading.Tasks;
using OmahaMTG._01_Models;
using OmahaMTG.Data;

namespace OmahaMTG._02_Managers.Contract
{
    public interface IPresenterManager
    {
        Task<PresenterModel> CreatePresenter(PresenterCreateRequest request);
        Task<PresenterModel> UpdatePresenter(PresenterUpdateRequest request);
        Task DeletePresenter(PresenterDeleteRequest request);
        Task<SkipTakeSet<PresenterModel>> QueryPresenter(PresenterQueryRequest request);

    }
}