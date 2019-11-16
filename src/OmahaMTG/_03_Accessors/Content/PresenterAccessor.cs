using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OmahaMTG._01_Managers.Admin.Model.Presenter;
using OmahaMTG._03_Accessors.Content.Contract;
using OmahaMTG._05_Data;

namespace OmahaMTG._03_Accessors.Content
{
    internal partial class ContentAccessor : IPresenterAccessor
    {
        public async Task<PresenterModel> CreatePresenter(PresenterCreateRequest request)
        {
            var newRecord = request.ToPresenterData();
            _dbContext.Presenters.Add(newRecord);
            await _dbContext.SaveChangesAsync();
            return newRecord.ToPresenter();
        }

        public async Task<PresenterModel> UpdatePresenter(PresenterUpdateRequest request)
        {
            var presenterToUpdate = await _dbContext.Presenters.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (presenterToUpdate != null)
            {
                presenterToUpdate.ApplyUpdatePresenterRequestToPresenterData(request);

                await _dbContext.SaveChangesAsync();
            }

            return presenterToUpdate.ToPresenter();
        }

        public async Task DeletePresenter(PresenterDeleteRequest request)
        {
            var presenterToDelete = await _dbContext.Presenters.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (presenterToDelete != null)
            {
                if (request.Perm)
                {
                    _dbContext.Presenters.Remove(presenterToDelete);
                }
                else
                {
                    presenterToDelete.IsDeleted = true;
                    ;
                }

                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<SkipTakeSet<PresenterModel>> QueryPresenter(PresenterQueryRequest request)
        {
            var result = await _dbContext.Presenters
                .Where(p => request.IncludeDeleted || !p.IsDeleted)
                .Where(p => string.IsNullOrWhiteSpace(request.Filter) ||
                            EF.Functions.Like(p.Name, $"%{request.Filter}%"))
                .OrderBy(p => p.Name)
                .ThenBy(p => p.CreatedDate)
                .AsSkipTakeSet(request.Skip, request.Take, d => d.ToPresenter());

            return result;
        }

        public async Task<PresenterModel> GetPresenter(PresenterGetRequest request)
        {
            var result = await _dbContext.Presenters
                .Where(p => request.Id == p.Id)
                .Select(s => s.ToPresenter())
                .FirstOrDefaultAsync();

            return result;
        }
    }
}