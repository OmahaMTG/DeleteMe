using OmahaMTG._01_Models.Admin.Presentation;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG._02_Managers.Contract
{
    public interface IPresentationManager
    {
        Task<PresentationModel> CreatePresentation(PresentationCreateRequest request);
        Task<PresentationModel> UpdatePresentation(PresentationUpdateRequest request);
        Task DeletePresentation(PresentationDeleteRequest request);
        Task<SkipTakeSet<PresentationModel>> QueryPresentation(PresentationQueryRequest request);
        Task<PresentationModel> GetPresentation(PresentationGetRequest request);
    }
}