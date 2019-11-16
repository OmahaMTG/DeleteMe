using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OmahaMTG._01_Managers.Admin.Model.Sponsor;
using OmahaMTG._03_Accessors.Content.Contract;
using OmahaMTG._05_Data;

namespace OmahaMTG._03_Accessors.Content
{
    internal partial class ContentAccessor : ISponsorAccessor
    {
        public async Task<SponsorModel> CreateSponsor(SponsorCreateRequest request)
        {
            var newRecord = request.ToSponsorData();
            _dbContext.Sponsors.Add(newRecord);
            await _dbContext.SaveChangesAsync();
            return newRecord.ToSponsor();
        }

        public async Task<SponsorModel> UpdateSponsor(SponsorUpdateRequest request)
        {
            var sponsorToUpdate = await _dbContext.Sponsors.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (sponsorToUpdate != null)
            {
                sponsorToUpdate.ApplyUpdateSponsorRequestToSponsorData(request);
                await _dbContext.SaveChangesAsync();
            }

            return sponsorToUpdate.ToSponsor();
        }

        public async Task DeleteSponsor(SponsorDeleteRequest request)
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
            }
        }

        public async Task<SkipTakeSet<SponsorModel>> QuerySponsor(SponsorQueryRequest request)
        {
            var result = await _dbContext.Sponsors
                .Where(p => request.IncludeDeleted || !p.IsDeleted)
                .Where(p => string.IsNullOrWhiteSpace(request.Filter) ||
                            EF.Functions.Like(p.Name, $"%{request.Filter}%"))
                .OrderBy(p => p.Name)
                .ThenBy(p => p.CreatedDate)
                .AsSkipTakeSet(request.Skip, request.Take, d => d.ToSponsor());

            return result;
        }

        public async Task<SponsorModel> GetSponsor(SponsorGetRequest request)
        {
            var result = await _dbContext.Sponsors
                .Where(p => request.Id == p.Id)
                .Select(s => s.ToSponsor())
                .FirstOrDefaultAsync();

            return result;
        }
    }
}