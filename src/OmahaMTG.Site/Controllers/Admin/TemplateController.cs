using System.Threading.Tasks;
using Hero4Hire.Architecture.Managers;
using Microsoft.AspNetCore.Mvc;
using OmahaMTG._00_Common;
using OmahaMTG._01_Managers.Admin.Contract;
using OmahaMTG._01_Managers.Admin.Model.Template;
using OmahaMTG.Data;

namespace OmahaMTG.Site.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateController : ControllerBase
    {
        private readonly IManagerFactory<AmbientContext> _managerFactory;
        public TemplateController(IManagerFactory<AmbientContext> managerFactory)
        {
            _managerFactory = managerFactory;
        }

        private ITemplateManager TemplateManager => _managerFactory.CreateManager<ITemplateManager>();


        // GET: api/Default
        [HttpGet]
        public async Task<ActionResult<SkipTakeSet<TemplateModel>>> Get([FromQuery]TemplateQueryRequest request)
        {
            return await TemplateManager.QueryTemplate(request);
        }

        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<TemplateModel>> Get(int id)
        {
            return await TemplateManager.GetTemplate(new TemplateGetRequest() { Id = id });
        }

        // POST: api/Default
        [HttpPost]
        public async Task<ActionResult<TemplateModel>> Post([FromBody] TemplateCreateRequest request)
        {
            return await TemplateManager.CreateTemplate(request);
        }

        // PUT: api/Default/5
        [HttpPut("{id}")]
        public async Task<ActionResult<TemplateModel>> Put(int id, [FromBody] TemplateUpdateRequest request)
        {
            request.Id = id;
            return await TemplateManager.UpdateTemplate(request);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery]bool perm)
        {
            await TemplateManager.DeleteTemplate(new TemplateDeleteRequest() { Id = id, Perm = perm });
            return Ok();
        }
    }
}
