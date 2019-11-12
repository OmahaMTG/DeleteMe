using OmahaMTG._01_Models.Admin.Template;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG.Accessors.ContentAccessorContracts
{
    public interface ITemplateManager
    {

        Task<TemplateModel> CreateTemplate(TemplateCreateRequest request);
        Task<TemplateModel> UpdateTemplate(TemplateUpdateRequest request);
        Task DeleteTemplate(TemplateDeleteRequest request);
        Task<SkipTakeSet<TemplateModel>> QueryTemplate(TemplateQueryRequest request);


    }
}