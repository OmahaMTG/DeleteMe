using Hero4Hire.Architecture;
using Microsoft.EntityFrameworkCore;
using OmahaMTG._00_Model.Admin.Model.Host;
using OmahaMTG._03_Accessors.Content.Contract;
using System.Linq;
using System.Threading.Tasks;
using OmahaMTG.Infrastructure.Data;

namespace OmahaMTG._03_Accessors.Content
{
    internal partial class ContentAccessor : IHostAccessor
    {

        public async Task<Response<HostModel>> CreateHost(HostCreateRequest request)
        {
            var newRecord = request.ToHostData();
            _dbContext.Hosts.Add(newRecord);
            await _dbContext.SaveChangesAsync();
            return new Response<HostModel>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = newRecord.ToHost()
            };
        }

        public async Task<Response<HostModel>> UpdateHost(HostUpdateRequest request)
        {
            var hostToUpdate = await _dbContext.Hosts.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (hostToUpdate != null)
            {
                hostToUpdate.ApplyUpdateHostRequestToHostData(request);
                await _dbContext.SaveChangesAsync();
                return new Response<HostModel>()
                {
                    Status = ResponseStatusCodes.Ok,
                    Data = hostToUpdate.ToHost()
                };
            }

            return new Response<HostModel>() { Status = ResponseStatusCodes.NotFound };



        }

        public async Task<NullResponse> DeleteHost(HostDeleteRequest request)
        {
            var hostFromDatabase = await _dbContext.Hosts.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (hostFromDatabase != null)
            {
                if (request.Perm)
                    _dbContext.Hosts.Remove(hostFromDatabase);
                else
                    hostFromDatabase.IsDeleted = true;
                await _dbContext.SaveChangesAsync();
                return new NullResponse() { Status = ResponseStatusCodes.OkNoContent };
            }

            return new NullResponse() { Status = ResponseStatusCodes.NotFound };

        }

        public async Task<Response<SkipTakeSet<HostModel>>> QueryHost(HostQueryRequest request)
        {
            var result = await _dbContext.Hosts
                .Where(p => request.IncludeDeleted || !p.IsDeleted)
                .Where(p => string.IsNullOrWhiteSpace(request.Filter) ||
                            EF.Functions.Like(p.Name, $"%{request.Filter}%"))
                .OrderBy(p => p.Name)
                .ThenBy(p => p.CreatedDate)
                .AsSkipTakeSet(request.Skip, request.Take, d => d.ToHost());

            return new Response<SkipTakeSet<HostModel>>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = result
            };
        }

        public async Task<Response<HostModel>> GetHost(HostGetRequest request)
        {
            var result = await _dbContext.Hosts
                .Where(p => request.Id == p.Id)
                .Select(s => s.ToHost())
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return new Response<HostModel>() { Status = ResponseStatusCodes.NotFound };
            }

            return new Response<HostModel>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = result
            };
        }


    }
}