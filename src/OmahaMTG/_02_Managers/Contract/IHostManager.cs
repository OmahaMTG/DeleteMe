using OmahaMTG._01_Models.Admin.Host;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG._02_Managers.Contract
{
    public interface IHostManager
    {
        Task<HostModel> CreateHost(HostCreateRequest request);
        Task<HostModel> UpdateHost(HostUpdateRequest request);
        Task DeleteHost(HostDeleteRequest request);
        Task<SkipTakeSet<HostModel>> QueryHost(HostQueryRequest request);

        Task<HostModel> GetHost(HostGetRequest request);
    }
}