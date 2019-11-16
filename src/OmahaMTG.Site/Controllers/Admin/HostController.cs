using System.Threading.Tasks;
using Hero4Hire.Architecture.Managers;
using Microsoft.AspNetCore.Mvc;
using OmahaMTG._00_Common;
using OmahaMTG._01_Managers.Admin.Contract;
using OmahaMTG._01_Managers.Admin.Model.Host;
using OmahaMTG._05_Data;

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
            return await HostManager.QueryHost(request);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HostModel>> Get(int id)
        {
            return await HostManager.GetHost(new HostGetRequest {Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<HostModel>> Post([FromBody] HostCreateRequest request)
        {
            return await HostManager.CreateHost(request);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<HostModel>> Put(int id, [FromBody] HostUpdateRequest request)
        {
            return await HostManager.UpdateHost(request);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery] bool perm)
        {
            await HostManager.DeleteHost(new HostDeleteRequest {Id = id, Perm = perm});
            return Ok();
        }
    }
}