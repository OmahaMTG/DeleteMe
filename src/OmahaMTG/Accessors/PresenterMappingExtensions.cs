using OmahaMTG.Accessors.ContentAccessorContracts;
using OmahaMTG.Data;

namespace OmahaMTG.Accessors
{
    internal static class PresenterMappingExtensions
    {
        internal static PresenterData ToPresenterData(this PresenterCreateRequest createPresenterRequest)
        {
            return new PresenterData()
            {
                Bio = createPresenterRequest.Bio,
                Name = createPresenterRequest.Name,
                OmahaMtgUserId = createPresenterRequest.OmahaMtgUserId,
            };
        }

        internal static PresenterModel ToPresenter(this PresenterData presenterData)
        {
            return new PresenterModel()
            {
                Id = presenterData.Id,
                Bio = presenterData.Bio,
                Name = presenterData.Name,
                OmahaMtgUserId = presenterData.OmahaMtgUserId,

                IsDeleted = presenterData.IsDeleted
            };
        }

        internal static void ApplyUpdatePresenterRequestToPresenterData(this PresenterData presenterDataToUpdate, PresenterUpdateRequest updatePresenterRequest)
        {
            presenterDataToUpdate.Bio = updatePresenterRequest.Bio;
            presenterDataToUpdate.Name = updatePresenterRequest.Name;
            presenterDataToUpdate.OmahaMtgUserId = updatePresenterRequest.OmahaMtgUserId;
        }

        //internal static IEnumerable<PresenterModel> ToPresenters(this IEnumerable<PresenterData> presenterDatas)
        //{
        //    return presenterDatas.Select(u => u.ToPresenter());
        //}
    }
}