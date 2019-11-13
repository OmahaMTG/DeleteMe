using OmahaMTG.Data;
using System.Threading.Tasks;
using OmahaMTG._01_Managers.Admin.Model.Template;

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