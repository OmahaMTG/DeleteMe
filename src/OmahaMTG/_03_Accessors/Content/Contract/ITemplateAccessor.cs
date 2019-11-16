using System.Threading.Tasks;
using OmahaMTG._01_Managers.Admin.Model.Template;
using OmahaMTG._05_Data;

namespace OmahaMTG._03_Accessors.Content.Contract
{
    public interface ITemplateAccessor
    {
        Task<TemplateModel> CreateTemplate(TemplateCreateRequest request);
        Task<TemplateModel> UpdateTemplate(TemplateUpdateRequest request);
        Task DeleteTemplate(TemplateDeleteRequest request);
        Task<SkipTakeSet<TemplateModel>> QueryTemplate(TemplateQueryRequest request);
        Task<TemplateModel> GetTemplate(TemplateGetRequest request);
    }
}