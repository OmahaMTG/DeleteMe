using Hero4Hire.Architecture;
using Microsoft.EntityFrameworkCore;
using OmahaMTG._00_Model.Admin.Model.Sponsor;
using OmahaMTG._03_Accessors.Content.Contract;
using OmahaMTG._05_Data;
using System.Linq;
using System.Threading.Tasks;

namespace OmahaMTG._03_Accessors.Content
{
    internal partial class ContentAccessor : ISponsorAccessor
    {
        public async Task<Response<SponsorModel>> CreateSponsor(SponsorCreateRequest request)
        {
            var newRecord = request.ToSponsorData();
            _dbContext.Sponsors.Add(newRecord);
            await _dbContext.SaveChangesAsync();
            return new Response<SponsorModel>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = newRecord.ToSponsor()
            };
        }

        public async Task<Response<SponsorModel>> UpdateSponsor(SponsorUpdateRequest request)
        {
            var sponsorToUpdate = await _dbContext.Sponsors.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (sponsorToUpdate != null)
            {
                sponsorToUpdate.ApplyUpdateSponsorRequestToSponsorData(request);
                await _dbContext.SaveChangesAsync();
                return new Response<SponsorModel>()
                {
                    Status = ResponseStatusCodes.Ok,
                    Data = sponsorToUpdate.ToSponsor()
                };
            }

            return new Response<SponsorModel>() { Status = ResponseStatusCodes.NotFound };
        }

        public async Task<NullResponse> DeleteSponsor(SponsorDeleteRequest request)
        {
            var sponsorFromDatabase = await _dbContext.Sponsors.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (sponsorFromDatabase != null)
            {
                if (request.Perm)
                {
                    _dbContext.Sponsors.Remove(sponsorFromDatabase);
                }
                else
                {
                    sponsorFromDatabase.IsDeleted = true;
                    ;
                }

                await _dbContext.SaveChangesAsync();
                return new NullResponse() { Status = ResponseStatusCodes.OkNoContent };
            }

            return new NullResponse() { Status = ResponseStatusCodes.NotFound };
        }

        public async Task<Response<SkipTakeSet<SponsorModel>>> QuerySponsor(SponsorQueryRequest request)
        {
            var result = await _dbContext.Sponsors
                .Where(p => request.IncludeDeleted || !p.IsDeleted)
                .Where(p => string.IsNullOrWhiteSpace(request.Filter) ||
                            EF.Functions.Like(p.Name, $"%{request.Filter}%"))
                .OrderBy(p => p.Name)
                .ThenBy(p => p.CreatedDate)
                .AsSkipTakeSet(request.Skip, request.Take, d => d.ToSponsor());

            return new Response<SkipTakeSet<SponsorModel>>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = result
            };
        }

        public async Task<Response<SponsorModel>> GetSponsor(SponsorGetRequest request)
        {
            var result = await _dbContext.Sponsors
                .Where(p => request.Id == p.Id)
                .Select(s => s.ToSponsor())
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return new Response<SponsorModel>() { Status = ResponseStatusCodes.NotFound };
            }

            return new Response<SponsorModel>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = result
            };
        }
    }
}