using Hero4Hire.Architecture;
using OmahaMTG._00_Model.Admin.Model.Template;
using System.Threading.Tasks;
using OmahaMTG.Infrastructure.Data;

namespace OmahaMTG._01_Managers.Admin.Contract
{
    public interface ITemplateManager
    {
        Task<Response<TemplateModel>> CreateTemplate(TemplateCreateRequest request);
        Task<Response<TemplateModel>> UpdateTemplate(TemplateUpdateRequest request);
        Task<NullResponse> DeleteTemplate(TemplateDeleteRequest request);
        Task<Response<SkipTakeSet<TemplateModel>>> QueryTemplate(TemplateQueryRequest request);
        Task<Response<TemplateModel>> GetTemplate(TemplateGetRequest request);
    }
}