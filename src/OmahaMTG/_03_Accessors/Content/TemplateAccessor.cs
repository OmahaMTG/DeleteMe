using OmahaMTG._01_Managers.Admin.Model.Template;
using OmahaMTG._03_Accessors.ContentAccessor.Contract;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG._03_Accessors.Content
{
    partial class ContentAccessor : ITemplateAccessor
    {
        public Task<TemplateModel> CreateTemplate(TemplateCreateRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<TemplateModel> UpdateTemplate(TemplateUpdateRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task DeleteTemplate(TemplateDeleteRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<SkipTakeSet<TemplateModel>> QueryTemplate(TemplateQueryRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<TemplateModel> GetTemplate(TemplateGetRequest request)
        {
            throw new System.NotImplementedException();
        }
    }
}