using System.Threading.Tasks;
using OmahaMTG._00_Model.Admin.Model.Host;
using OmahaMTG._05_Data;

namespace OmahaMTG._01_Managers.Admin.Contract
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