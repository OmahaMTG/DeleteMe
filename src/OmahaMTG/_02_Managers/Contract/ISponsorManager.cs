using OmahaMTG._01_Models.Admin.Sponsor;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG._02_Managers.Contract
{
    public interface ISponsorManager
    {
        Task<SponsorModel> CreateSponsor(SponsorCreateRequest request);
        Task<SponsorModel> UpdateSponsor(SponsorUpdateRequest request);
        Task DeleteSponsor(SponsorDeleteRequest request);
        Task<SkipTakeSet<SponsorModel>> QuerySponsor(SponsorQueryRequest request);
        Task<SponsorModel> GetSponsor(SponsorModel request);

    }
}