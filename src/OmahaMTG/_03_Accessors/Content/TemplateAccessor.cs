using Hero4Hire.Architecture;
using Microsoft.EntityFrameworkCore;
using OmahaMTG._00_Model.Admin.Model.Template;
using OmahaMTG._03_Accessors.Content.Contract;
using System.Linq;
using System.Threading.Tasks;
using OmahaMTG.Infrastructure.Data;

namespace OmahaMTG._03_Accessors.Content
{
    internal partial class ContentAccessor : ITemplateAccessor
    {

        public async Task<Response<TemplateModel>> CreateTemplate(TemplateCreateRequest request)
        {
            var newRecord = request.ToTemplateData();
            _dbContext.Templates.Add(newRecord);
            await _dbContext.SaveChangesAsync();
            return new Response<TemplateModel>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = newRecord.ToTemplate()
            }; ;
        }

        public async Task<NullResponse> DeleteTemplate(TemplateDeleteRequest request)
        {
            var templateFromDatabase = await _dbContext.Templates.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (templateFromDatabase != null)
            {
                if (request.Perm)
                {
                    _dbContext.Templates.Remove(templateFromDatabase);
                }
                else
                {
                    templateFromDatabase.IsDeleted = true;
                    ;
                }

                await _dbContext.SaveChangesAsync();
                return new NullResponse() { Status = ResponseStatusCodes.OkNoContent };
            }

            return new NullResponse() { Status = ResponseStatusCodes.NotFound };
        }

        public async Task<Response<TemplateModel>> GetTemplate(TemplateGetRequest request)
        {
            var result = await _dbContext.Templates
                .Where(p => request.Id == p.Id)
                .Select(s => s.ToTemplate())
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return new Response<TemplateModel>() { Status = ResponseStatusCodes.NotFound };
            }

            return new Response<TemplateModel>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = result
            };
        }

        public async Task<Response<SkipTakeSet<TemplateModel>>> QueryTemplate(TemplateQueryRequest request)
        {
            var result = await _dbContext.Templates
                .Where(p => request.IncludeDeleted || !p.IsDeleted)
                .Where(p => string.IsNullOrWhiteSpace(request.Filter) ||
                            EF.Functions.Like(p.Name, $"%{request.Filter}%"))
                .OrderBy(p => p.Name)
                .ThenBy(p => p.CreatedDate)
                .AsSkipTakeSet(request.Skip, request.Take, d => d.ToTemplate());

            return new Response<SkipTakeSet<TemplateModel>>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = result
            };
        }

        public async Task<Response<TemplateModel>> UpdateTemplate(TemplateUpdateRequest request)
        {
            var templateToUpdate = await _dbContext.Templates.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (templateToUpdate != null)
            {
                templateToUpdate.ApplyUpdateTemplateRequestToTemplateData(request);
                await _dbContext.SaveChangesAsync();
                return new Response<TemplateModel>()
                {
                    Status = ResponseStatusCodes.Ok,
                    Data = templateToUpdate.ToTemplate()
                };
            }

            return new Response<TemplateModel>() { Status = ResponseStatusCodes.NotFound };
        }
    }
}