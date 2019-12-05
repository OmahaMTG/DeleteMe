using Hero4Hire.Architecture;
using OmahaMTG._00_Model.Admin.Model.Presenter;
using System.Threading.Tasks;
using OmahaMTG.Infrastructure.Data;

namespace OmahaMTG._03_Accessors.Content.Contract
{
    public interface IPresenterAccessor
    {
        Task<Response<PresenterModel>> CreatePresenter(PresenterCreateRequest request);
        Task<Response<PresenterModel>> UpdatePresenter(PresenterUpdateRequest request);
        Task<NullResponse> DeletePresenter(PresenterDeleteRequest request);
        Task<Response<SkipTakeSet<PresenterModel>>> QueryPresenter(PresenterQueryRequest request);
        Task<Response<PresenterModel>> GetPresenter(PresenterGetRequest request);
    }
}