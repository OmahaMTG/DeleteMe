using OmahaMTG._01_Managers.Admin.Model.Template;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG._03_Accessors.ContentAccessor.Contract
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