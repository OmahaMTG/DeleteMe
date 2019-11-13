using OmahaMTG.Data;
using System.Threading.Tasks;
using OmahaMTG._01_Managers.Admin.Model.Sponsor;

namespace OmahaMTG.Accessors.ContentAccessorContracts
{
    public interface ISponsorManager
    {
        Task<SponsorModel> CreateSponsor(SponsorCreateRequest request);
        Task<SponsorModel> UpdateSponsor(SponsorUpdateRequest request);
        Task DeleteSponsor(SponsorDeleteRequest request);
        Task<SkipTakeSet<SponsorModel>> QuerySponsor(SponsorQueryRequest request);

    }
}