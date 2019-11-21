using OmahaMTG._00_Model.Admin.Model.Template;
using OmahaMTG._05_Data;

namespace OmahaMTG._03_Accessors.Content
{
    internal static class TemplateMappingExtensions
    {
        internal static TemplateData ToTemplateData(this TemplateCreateRequest createTemplateRequest)
        {
            return new TemplateData
            {
                Body = createTemplateRequest.Body,
                Name = createTemplateRequest.Name
            };
        }

        internal static TemplateModel ToTemplate(this TemplateData templateData)
        {
            return new TemplateModel
            {
                Id = templateData.Id,
                Body = templateData.Body,
                Name = templateData.Name
            };
        }

        internal static void ApplyUpdateTemplateRequestToTemplateData(this TemplateData templateDataToUpdate,
            TemplateUpdateRequest updateTemplateRequest)
        {
            templateDataToUpdate.Name = updateTemplateRequest.Name;
            templateDataToUpdate.Body = updateTemplateRequest.Body;
        }

        //internal static IEnumerable<TemplateModel> ToTemplates(this IEnumerable<TemplateData> templateDatas)
        //{
        //    return templateDatas.Select(u => u.ToTemplate());
        //}
    }
}