using System.Threading.Tasks;
using OmahaMTG.Data;

namespace OmahaMTG.Accessors.ContentAccessorContracts
{
    public interface IPresentationAccessor
    {
        Task<PresentationModel> CreatePresentation(PresentationCreateRequest request);
        Task<PresentationModel> UpdatePresentation(PresentationUpdateRequest request);
        Task DeletePresentation(PresentationDeleteRequest request);
        Task<SkipTakeSet<PresentationModel>> QueryPresentation(PresentationQueryRequest request);

    }
}