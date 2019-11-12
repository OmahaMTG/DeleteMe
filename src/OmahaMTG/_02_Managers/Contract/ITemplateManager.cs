using OmahaMTG._01_Models.Admin.Template;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG._02_Managers.Contract
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