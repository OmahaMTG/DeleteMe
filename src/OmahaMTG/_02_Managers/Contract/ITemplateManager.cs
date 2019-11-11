using System.Threading.Tasks;
using OmahaMTG._01_Models;
using OmahaMTG.Data;

namespace OmahaMTG._02_Managers.Contract
{
    public interface ITemplateManager
    {

        Task<TemplateModel> CreateTemplate(TemplateCreateRequest request);
        Task<TemplateModel> UpdateTemplate(TemplateUpdateRequest request);
        Task DeleteTemplate(TemplateDeleteRequest request);
        Task<SkipTakeSet<TemplateModel>> QueryTemplate(TemplateQueryRequest request);


    }
}