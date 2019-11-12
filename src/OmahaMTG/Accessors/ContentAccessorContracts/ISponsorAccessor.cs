using OmahaMTG._01_Models.Admin.Sponsor;
using OmahaMTG.Data;
using System.Threading.Tasks;

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