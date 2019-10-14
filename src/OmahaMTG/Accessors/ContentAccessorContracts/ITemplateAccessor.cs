using System.Threading.Tasks;
using OmahaMTG.Data;

namespace OmahaMTG.Accessors.ContentAccessorContracts
{
    public interface ITemplateAccessor
    {

            Task<TemplateModel> CreateTemplate(TemplateCreateRequest request);
            Task<TemplateModel> UpdateTemplate(TemplateUpdateRequest request);
            Task DeleteTemplate(TemplateDeleteRequest request);
            Task<SkipTakeSet<TemplateModel>> QueryTemplate(TemplateQueryRequest request);

        
    }
}