using System.Threading.Tasks;
using Hero4Hire.Architecture.Managers;
using Microsoft.AspNetCore.Mvc;
using OmahaMTG._00_Common;
using OmahaMTG._01_Managers.Admin.Contract;
using OmahaMTG._01_Managers.Admin.Model.Sponsor;
using OmahaMTG._05_Data;

namespace OmahaMTG.Site.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class SponsorController : ControllerBase
    {
        private readonly IManagerFactory<AmbientContext> _managerFactory;

        public SponsorController(IManagerFactory<AmbientContext> managerFactory)
        {
            _managerFactory = managerFactory;
        }

        private ISponsorManager SponsorManager => _managerFactory.CreateManager<ISponsorManager>();


        // GET: api/Default
        [HttpGet]
        public async Task<ActionResult<SkipTakeSet<SponsorModel>>> Get([FromQuery] SponsorQueryRequest request)
        {
            return await SponsorManager.QuerySponsor(request);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SponsorModel>> Get(int id)
        {
            return await SponsorManager.GetSponsor(new SponsorGetRequest {Id = id});
        }

        // POST: api/Default
        [HttpPost]
        public async Task<ActionResult<SponsorModel>> Post([FromBody] SponsorCreateRequest request)
        {
            return await SponsorManager.CreateSponsor(request);
        }

        // PUT: api/Default/5
        [HttpPut("{id}")]
        public async Task<ActionResult<SponsorModel>> Put(int id, [FromBody] SponsorUpdateRequest request)
        {
            request.Id = id;
            return await SponsorManager.UpdateSponsor(request);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery] bool perm)
        {
            await SponsorManager.DeleteSponsor(new SponsorDeleteRequest {Id = id, Perm = perm});
            return Ok();
        }
    }
}