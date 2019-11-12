using OmahaMTG._01_Models.Admin.Presenter;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG.Accessors.ContentAccessorContracts
{
    public interface IPresenterManager
    {
        Task<PresenterModel> CreatePresenter(PresenterCreateRequest request);
        Task<PresenterModel> UpdatePresenter(PresenterUpdateRequest request);
        Task DeletePresenter(PresenterDeleteRequest request);
        Task<SkipTakeSet<PresenterModel>> QueryPresenter(PresenterQueryRequest request);

    }
}