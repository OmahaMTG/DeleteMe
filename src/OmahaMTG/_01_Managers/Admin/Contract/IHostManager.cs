using Hero4Hire.Architecture;
using OmahaMTG._00_Model.Admin.Model.Host;
using OmahaMTG._05_Data;
using System.Threading.Tasks;

namespace OmahaMTG._01_Managers.Admin.Contract
{
    public interface IHostManager
    {
        Task<Response<HostModel>> CreateHost(HostCreateRequest request);
        Task<Response<HostModel>> UpdateHost(HostUpdateRequest request);
        Task<NullResponse> DeleteHost(HostDeleteRequest request);
        Task<Response<SkipTakeSet<HostModel>>> QueryHost(HostQueryRequest request);

        Task<Response<HostModel>> GetHost(HostGetRequest request);
    }
}