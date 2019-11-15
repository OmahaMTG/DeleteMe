using Microsoft.AspNetCore.Mvc;
using OmahaMTG._01_Managers.Admin.Model.Host;
using OmahaMTG.Data;
using System;
using System.Threading.Tasks;
using Hero4Hire.Architecture;
using OmahaMTG._00_Common;

//using OmahaMTG.Accessors.ContentAccessorContracts;

namespace OmahaMTG.Site.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostController : ControllerBase
    {
        private readonly IServiceProvider _serviceProvider;
        public HostController(IServiceProvider serviceProvider, IAmbientContextFactory<AmbientContext> factory)
        {
            _serviceProvider = serviceProvider;
        }

        // GET: api/Default
        [HttpGet]
        public async Task<ActionResult<SkipTakeSet<HostModel>>> Get([FromQuery]HostQueryRequest request)
        {

            //var managerFactory = new Hero4Hire.Architecture.Managers.ManagerFactory<string>(_serviceProvider, "test");
            //var manager = managerFactory.CreateManager<IHostManager>();

            //return await manager.QueryHost(request);

            throw new NotImplementedException();
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
