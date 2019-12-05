using Hero4Hire.Architecture.Managers;
using Microsoft.AspNetCore.Mvc;
using OmahaMTG._00_Model;
using OmahaMTG._00_Model.Admin.Model.Template;
using OmahaMTG._01_Managers.Admin.Contract;
using System.Threading.Tasks;
using OmahaMTG.Infrastructure.Data;

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
        public async Task<ActionResult<SkipTakeSet<TemplateModel>>> Get([FromQuery] TemplateQueryRequest request)
        {
            var result = await TemplateManager.QueryTemplate(request);
            return result.ToActionResult();

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TemplateModel>> Get(int id)
        {
            var result = await TemplateManager.GetTemplate(new TemplateGetRequest { Id = id });
            return result.ToActionResult();
        }

        // POST: api/Default
        [HttpPost]
        public async Task<ActionResult<TemplateModel>> Post([FromBody] TemplateCreateRequest request)
        {
            var result = await TemplateManager.CreateTemplate(request);
            return result.ToActionResult();
        }

        // PUT: api/Default/5
        [HttpPut("{id}")]
        public async Task<ActionResult<TemplateModel>> Put(int id, [FromBody] TemplateUpdateRequest request)
        {
            request.Id = id;
            var result = await TemplateManager.UpdateTemplate(request);
            return result.ToActionResult();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery] bool perm)
        {
            var result = await TemplateManager.DeleteTemplate(new TemplateDeleteRequest { Id = id, Perm = perm });
            return result.ToActionResult();
        }
    }
}