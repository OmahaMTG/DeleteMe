using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OmahaMTG._00_Model.Admin.Model.Host;
using OmahaMTG._03_Accessors.Content.Contract;
using OmahaMTG._05_Data;

namespace OmahaMTG._03_Accessors.Content
{
    internal partial class ContentAccessor : IHostAccessor
    {
        public async Task<HostModel> CreateHost(HostCreateRequest request)
        {
            var newRecord = request.ToHostData();
            _dbContext.Hosts.Add(newRecord);
            await _dbContext.SaveChangesAsync();
            return newRecord.ToHost();
        }

        public async Task<HostModel> UpdateHost(HostUpdateRequest request)
        {
            var hostToUpdate = await _dbContext.Hosts.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (hostToUpdate != null)
            {
                hostToUpdate.ApplyUpdateHostRequestToHostData(request);
                await _dbContext.SaveChangesAsync();
            }

            return hostToUpdate.ToHost();
        }

        public async Task DeleteHost(HostDeleteRequest request)
        {
            var hostFromDatabase = await _dbContext.Hosts.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (hostFromDatabase != null)
            {
                if (request.Perm)
                    _dbContext.Hosts.Remove(hostFromDatabase);
                else
                    hostFromDatabase.IsDeleted = true;
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<SkipTakeSet<HostModel>> QueryHost(HostQueryRequest request)
        {
            var result = await _dbContext.Hosts
                .Where(p => request.IncludeDeleted || !p.IsDeleted)
                .Where(p => string.IsNullOrWhiteSpace(request.Filter) ||
                            EF.Functions.Like(p.Name, $"%{request.Filter}%"))
                .OrderBy(p => p.Name)
                .ThenBy(p => p.CreatedDate)
                .AsSkipTakeSet(request.Skip, request.Take, d => d.ToHost());

            return result;
        }

        public async Task<HostModel> GetHost(HostGetRequest request)
        {
            var result = await _dbContext.Hosts
                .Where(p => request.Id == p.Id)
                .Select(s => s.ToHost())
                .FirstOrDefaultAsync();

            return result;
        }
    }
}