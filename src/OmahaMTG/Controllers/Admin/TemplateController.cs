using Microsoft.AspNetCore.Mvc;
using OmahaMTG._01_Models.Admin.Template;
using OmahaMTG.Accessors.ContentAccessorContracts;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateController : ControllerBase
    {
        private readonly ITemplateManager _templateAccessor;
        public TemplateController(ITemplateManager templateAccessor)
        {
            _templateAccessor = templateAccessor;
        }

        // GET: api/Default
        [HttpGet]
        public async Task<ActionResult<SkipTakeSet<TemplateModel>>> Get([FromQuery]TemplateQueryRequest request)
        {
            return await _templateAccessor.QueryTemplate(request);
        }

        // POST: api/Default
        [HttpPost]
        public async Task<ActionResult<TemplateModel>> Post([FromBody] TemplateCreateRequest request)
        {
            return await _templateAccessor.CreateTemplate(request);
        }

        // PUT: api/Default/5
        [HttpPut("{id}")]
        public async Task<ActionResult<TemplateModel>> Put(int id, [FromBody] TemplateUpdateRequest request)
        {
            request.Id = id;
            return await _templateAccessor.UpdateTemplate(request);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery]bool perm)
        {
            await _templateAccessor.DeleteTemplate(new TemplateDeleteRequest() { Id = id, Perm = perm });
            return Ok();
        }
    }
}
