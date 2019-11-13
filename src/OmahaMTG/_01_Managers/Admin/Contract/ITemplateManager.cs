using System.Threading.Tasks;
using OmahaMTG._01_Managers.Admin.Model.Template;
using OmahaMTG.Data;

namespace OmahaMTG._01_Managers.Admin.Contract
{
    public interface ITemplateManager
    {

        Task<TemplateModel> CreateTemplate(TemplateCreateRequest request);
        Task<TemplateModel> UpdateTemplate(TemplateUpdateRequest request);
        Task DeleteTemplate(TemplateDeleteRequest request);
        Task<SkipTakeSet<TemplateModel>> QueryTemplate(TemplateQueryRequest request);
        Task<TemplateModel> GetTemplate(TemplateGetRequest request);


    }
}