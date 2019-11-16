using System.Threading.Tasks;
using OmahaMTG._01_Managers.Admin.Model.Sponsor;
using OmahaMTG._05_Data;

namespace OmahaMTG._01_Managers.Admin.Contract
{
    public interface ISponsorManager
    {
        Task<SponsorModel> CreateSponsor(SponsorCreateRequest request);
        Task<SponsorModel> UpdateSponsor(SponsorUpdateRequest request);
        Task DeleteSponsor(SponsorDeleteRequest request);
        Task<SkipTakeSet<SponsorModel>> QuerySponsor(SponsorQueryRequest request);
        Task<SponsorModel> GetSponsor(SponsorGetRequest request);
    }
}