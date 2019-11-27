using Hero4Hire.Architecture;
using OmahaMTG._00_Model.Admin.Model.Sponsor;
using OmahaMTG._05_Data;
using System.Threading.Tasks;

namespace OmahaMTG._01_Managers.Admin.Contract
{
    public interface ISponsorManager
    {
        Task<Response<SponsorModel>> CreateSponsor(SponsorCreateRequest request);
        Task<Response<SponsorModel>> UpdateSponsor(SponsorUpdateRequest request);
        Task<NullResponse> DeleteSponsor(SponsorDeleteRequest request);
        Task<Response<SkipTakeSet<SponsorModel>>> QuerySponsor(SponsorQueryRequest request);
        Task<Response<SponsorModel>> GetSponsor(SponsorGetRequest request);
    }
}