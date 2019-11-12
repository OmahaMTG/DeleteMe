using Microsoft.AspNetCore.Mvc;
using OmahaMTG._01_Models.Admin.Host;
using OmahaMTG.Accessors.ContentAccessorContracts;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostController : ControllerBase
    {
        private readonly IHostManager _hostAccessor;
        public HostController(IHostManager hostAccessor)
        {
            _hostAccessor = hostAccessor;
        }

        // GET: api/Default
        [HttpGet]
        public async Task<ActionResult<SkipTakeSet<HostModel>>> Get([FromQuery]HostQueryRequest request)
        {
            return await _hostAccessor.QueryHost(request);
        }

        // POST: api/Default
        [HttpPost]
        public async Task<ActionResult<HostModel>> Post([FromBody] HostCreateRequest request)
        {
            return await _hostAccessor.CreateHost(request);
        }

        // PUT: api/Default/5
        [HttpPut("{id}")]
        public async Task<ActionResult<HostModel>> Put(int id, [FromBody] HostUpdateRequest request)
        {
            request.Id = id;
            return await _hostAccessor.UpdateHost(request);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery]bool perm)
        {
            await _hostAccessor.DeleteHost(new HostDeleteRequest() { Id = id, Perm = perm });
            return Ok();
        }
    }
}
