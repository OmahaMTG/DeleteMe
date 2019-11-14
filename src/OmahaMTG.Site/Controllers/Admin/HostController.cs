using Hero4Hire.Architecture.Managers;
using Microsoft.AspNetCore.Mvc;
using OmahaMTG._01_Managers.Admin.Contract;
using OmahaMTG._01_Managers.Admin.Model.Host;
using OmahaMTG.Data;
using System.Threading.Tasks;

//using OmahaMTG.Accessors.ContentAccessorContracts;

namespace OmahaMTG.Site.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostController : ControllerBase
    {
        private readonly IManagerFactory<string> _managerFactory;
        public HostController(IManagerFactory<string> managerFactory)
        {
            _managerFactory = managerFactory;
        }

        // GET: api/Default
        [HttpGet]
        public async Task<ActionResult<SkipTakeSet<HostModel>>> Get([FromQuery]HostQueryRequest request)
        {
            var manager = _managerFactory.CreateManager<IHostManager>();
            //  var manager = new Hero4Hire.Architecture.Managers.ManagerFactory<string>(_serviceProvider, "test");
            //var m = manager.CreateManager<IHostManager>();

            return await manager.QueryHost(request);


            //return await _hostAccessor.QueryHost(request);
        }

        //// POST: api/Default
        //[HttpPost]
        //public async Task<ActionResult<HostModel>> Post([FromBody] HostCreateRequest request)
        //{
        //    return await _hostAccessor.CreateHost(request);
        //}

        //// PUT: api/Default/5
        //[HttpPut("{id}")]
        //public async Task<ActionResult<HostModel>> Put(int id, [FromBody] HostUpdateRequest request)
        //{
        //    request.Id = id;
        //    return await _hostAccessor.UpdateHost(request);
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult> Delete(int id, [FromQuery]bool perm)
        //{
        //    await _hostAccessor.DeleteHost(new HostDeleteRequest() { Id = id, Perm = perm });
        //    return Ok();
        //}
    }
}
