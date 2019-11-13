using OmahaMTG._01_Managers.Admin.Model.Host;
using OmahaMTG._03_Accessors.ContentAccessor.Contract;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG._03_Accessors.Content
{
    partial class ContentAccessor : IHostAccessor
    {
        public Task<HostModel> CreateHost(HostCreateRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<HostModel> UpdateHost(HostUpdateRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task DeleteHost(HostDeleteRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<SkipTakeSet<HostModel>> QueryHost(HostQueryRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<HostModel> GetHost(HostGetRequest request)
        {
            throw new System.NotImplementedException();
        }
    }
}