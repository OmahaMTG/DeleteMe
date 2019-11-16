using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OmahaMTG._01_Managers.Admin.Model.Template;
using OmahaMTG._03_Accessors.Content.Contract;
using OmahaMTG._05_Data;

namespace OmahaMTG._03_Accessors.Content
{
    internal partial class ContentAccessor : ITemplateAccessor
    {
        public async Task<TemplateModel> CreateTemplate(TemplateCreateRequest request)
        {
            var newRecord = request.ToTemplateData();
            _dbContext.Templates.Add(newRecord);
            await _dbContext.SaveChangesAsync();
            return newRecord.ToTemplate();
        }

        public async Task<TemplateModel> UpdateTemplate(TemplateUpdateRequest request)
        {
            var templateToUpdate = await _dbContext.Templates.FirstOrDefaultAsync(w => w.Id == request.Id);
            if (templateToUpdate != null)
            {
                templateToUpdate.ApplyUpdateTemplateRequestToTemplateData(request);
                await _dbContext.SaveChangesAsync();
            }

            return templateToUpdate.ToTemplate();
        }

        public async Task DeleteTemplate(TemplateDeleteRequest request)
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
            }
        }

        public async Task<SkipTakeSet<TemplateModel>> QueryTemplate(TemplateQueryRequest request)
        {
            var result = await _dbContext.Templates
                .Where(p => request.IncludeDeleted || !p.IsDeleted)
                .Where(p => string.IsNullOrWhiteSpace(request.Filter) ||
                            EF.Functions.Like(p.Name, $"%{request.Filter}%"))
                .OrderBy(p => p.Name)
                .ThenBy(p => p.CreatedDate)
                .AsSkipTakeSet(request.Skip, request.Take, d => d.ToTemplate());

            return result;
        }

        public async Task<TemplateModel> GetTemplate(TemplateGetRequest request)
        {
            var result = await _dbContext.Templates
                .Where(p => request.Id == p.Id)
                .Select(s => s.ToTemplate())
                .FirstOrDefaultAsync();

            return result;
        }
    }
}