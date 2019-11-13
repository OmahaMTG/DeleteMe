using OmahaMTG._01_Managers.Admin.Model.Host;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG._03_Accessors.ContentAccessor.Contract
{
    public interface IHostAccessor
    {
        Task<HostModel> CreateHost(HostCreateRequest request);
        Task<HostModel> UpdateHost(HostUpdateRequest request);
        Task DeleteHost(HostDeleteRequest request);
        Task<SkipTakeSet<HostModel>> QueryHost(HostQueryRequest request);
        Task<HostModel> GetHost(HostGetRequest request);
    }
}