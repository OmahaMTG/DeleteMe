using System.Threading.Tasks;
using OmahaMTG._01_Models;
using OmahaMTG.Data;

namespace OmahaMTG._02_Managers.Contract
{
    public interface IPresentationManager
    {
        Task<PresentationModel> CreatePresentation(PresentationCreateRequest request);
        Task<PresentationModel> UpdatePresentation(PresentationUpdateRequest request);
        Task DeletePresentation(PresentationDeleteRequest request);
        Task<SkipTakeSet<PresentationModel>> QueryPresentation(PresentationQueryRequest request);

    }
}