using Hero4Hire.Architecture.Managers;
using Microsoft.AspNetCore.Mvc;
using OmahaMTG._00_Model;
using OmahaMTG._00_Model.Admin.Model.Host;
using OmahaMTG._01_Managers.Admin.Contract;
using OmahaMTG._05_Data;
using System.Threading.Tasks;

namespace OmahaMTG.Site.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostController : ControllerBase
    {
        private readonly IManagerFactory<AmbientContext> _managerFactory;

        public HostController(IManagerFactory<AmbientContext> managerFactory)
        {
            _managerFactory = managerFactory;
        }

        private IHostManager HostManager => _managerFactory.CreateManager<IHostManager>();

        [HttpGet]
        public async Task<ActionResult<SkipTakeSet<HostModel>>> Get([FromQuery] HostQueryRequest request)
        {
            var result = await HostManager.QueryHost(request);
            return result.ToActionResult();

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HostModel>> Get(int id)
        {
            var result = await HostManager.GetHost(new HostGetRequest { Id = id });
            return result.ToActionResult();
        }

        [HttpPost]
        public async Task<ActionResult<HostModel>> Post([FromBody] HostCreateRequest request)
        {
            var result = await HostManager.CreateHost(request);
            return result.ToActionResult();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<HostModel>> Put(int id, [FromBody] HostUpdateRequest request)
        {
            request.Id = id;
            var result = await HostManager.UpdateHost(request);
            return result.ToActionResult();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery] bool perm)
        {
            var result = await HostManager.DeleteHost(new HostDeleteRequest { Id = id, Perm = perm });
            return result.ToActionResult();
        }
    }
}