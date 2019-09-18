using System.Linq;
using OmahaMTG.Accessors.ContentAccessorContracts;
using OmahaMTG.Data;

namespace OmahaMTG.Accessors
{
    internal static class PresentationMappingExtensions
    {
        internal static PresentationData ToPresentationData(this PresentationCreateRequest createPresentationRequest)
        {
            return new PresentationData()
            {

                Title = createPresentationRequest.Title,
                Details = createPresentationRequest.Details,
                PresentationPresenters = createPresentationRequest.PresenterIds.Select(s => new PresentationPresenterData() { PresenterId = s }).ToList(),
            };
        }

        internal static PresentationModel ToPresentation(this PresentationData presentationData)
        {
            return new PresentationModel()
            {
                Id = presentationData.Id,
                Details = presentationData.Details,
                Title = presentationData.Title,
                PresenterIds = presentationData.PresentationPresenters?.Select(pp => pp.PresenterId)

            };
        }

        //internal static IEnumerable<Model> ToPresentations(this IEnumerable<PresentationData> presentationDatas)
        //{
        //    return presentationDatas.Select(u => u.ToPresentation());
        //}

        //internal static IEnumerable<PresentationData> ToPresentationsDatas(this IEnumerable<CreateUpdatePresentationRequest> presentationDatas)
        //{
        //    return presentationDatas.Select(u => u.ToPresentationData());
        //}

        internal static void ApplyUpdatePresentationRequestToPresentationData(this PresentationData presentationDataToUpdate, PresentationUpdateRequest updatePresentationRequest)
        {
            presentationDataToUpdate.Details = updatePresentationRequest.Details;
            presentationDataToUpdate.Title = updatePresentationRequest.Title;
            presentationDataToUpdate.PresentationPresenters = updatePresentationRequest.PresenterIds.Select(s => new PresentationPresenterData() { PresenterId = s }).ToList();

        }
    }
}