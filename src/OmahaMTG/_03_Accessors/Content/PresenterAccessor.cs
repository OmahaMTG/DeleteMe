using Hero4Hire.Architecture;
using Microsoft.EntityFrameworkCore;
using OmahaMTG._00_Model.Admin.Model.Presenter;
using OmahaMTG._03_Accessors.Content.Contract;
using OmahaMTG._05_Data;
using System.Linq;
using System.Threading.Tasks;

namespace OmahaMTG._03_Accessors.Content
{
    internal partial class ContentAccessor : IPresenterAccessor
    {
        public async Task<Response<PresenterModel>> CreatePresenter(PresenterCreateRequest request)
        {
            var newRecord = request.ToPresenterData();
            _dbContext.Presenters.Add(newRecord);
            await _dbContext.SaveChangesAsync();
            return new Response<PresenterModel>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = newRecord.ToPresenter()
            };
        }

        public async Task<NullResponse> DeletePresenter(PresenterDeleteRequest request)
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

                return new NullResponse() { Status = ResponseStatusCodes.OkNoContent };
            }

            return new NullResponse() { Status = ResponseStatusCodes.NotFound };
        }

        public async Task<Response<PresenterModel>> GetPresenter(PresenterGetRequest request)
        {
            var result = await _dbContext.Presenters
                .Where(p => request.Id == p.Id)
                .Select(s => s.ToPresenter())
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return new Response<PresenterModel>() { Status = ResponseStatusCodes.NotFound };
            }

            return new Response<PresenterModel>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = result
            };
        }

        public async Task<Response<SkipTakeSet<PresenterModel>>> QueryPresenter(PresenterQueryRequest request)
        {
            var result = await _dbContext.Presenters
                .Where(p => request.IncludeDeleted || !p.IsDeleted)
                .Where(p => string.IsNullOrWhiteSpace(request.Filter) ||
                            EF.Functions.Like(p.Name, $"%{request.Filter}%"))
                .OrderBy(p => p.Name)
                .ThenBy(p => p.CreatedDate)
                .AsSkipTakeSet(request.Skip, request.Take, d => d.ToPresenter());

            return new Response<SkipTakeSet<PresenterModel>>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = result
            };
        }

        public async Task<Response<PresenterModel>> UpdatePresenter(PresenterUpdateRequest request)
        {
            var presenterToUpdate = await _dbContext.Presenters.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (presenterToUpdate != null)
            {
                presenterToUpdate.ApplyUpdatePresenterRequestToPresenterData(request);

                await _dbContext.SaveChangesAsync();
                return new Response<PresenterModel>()
                {
                    Status = ResponseStatusCodes.Ok,
                    Data = presenterToUpdate.ToPresenter()
                };
            }

            return new Response<PresenterModel>() { Status = ResponseStatusCodes.NotFound };
        }
    }
}