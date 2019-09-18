using System.Threading.Tasks;
using OmahaMTG.Data;

namespace OmahaMTG.Accessors.ContentAccessorContracts
{
    public interface IPresenterAccessor
    {
        Task<PresenterModel> CreatePresenter(PresenterCreateRequest request);
        Task<PresenterModel> UpdatePresenter(PresenterUpdateRequest request);
        Task DeletePresenter(PresenterDeleteRequest request);
        Task<SkipTakeSet<PresenterModel>> QueryPresenter(PresenterQueryRequest request);

    }
}