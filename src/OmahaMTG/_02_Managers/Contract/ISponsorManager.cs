using System.Threading.Tasks;
using OmahaMTG._01_Models;
using OmahaMTG.Data;

namespace OmahaMTG._02_Managers.Contract
{
    public interface ISponsorManager
    {
        Task<SponsorModel> CreateSponsor(SponsorCreateRequest request);
        Task<SponsorModel> UpdateSponsor(SponsorUpdateRequest request);
        Task DeleteSponsor(SponsorDeleteRequest request);
        Task<SkipTakeSet<SponsorModel>> QuerySponsor(SponsorQueryRequest request);

    }
}