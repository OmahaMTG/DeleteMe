using Hero4Hire.Architecture.Managers;
using Microsoft.AspNetCore.Mvc;
using OmahaMTG._00_Model;
using OmahaMTG._00_Model.Admin.Model.Sponsor;
using OmahaMTG._01_Managers.Admin.Contract;
using System.Threading.Tasks;
using OmahaMTG.Infrastructure.Data;

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
            var result = await SponsorManager.QuerySponsor(request);
            return result.ToActionResult();

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SponsorModel>> Get(int id)
        {
            var result = await SponsorManager.GetSponsor(new SponsorGetRequest { Id = id });
            return result.ToActionResult();
        }

        // POST: api/Default
        [HttpPost]
        public async Task<ActionResult<SponsorModel>> Post([FromBody] SponsorCreateRequest request)
        {
            var result = await SponsorManager.CreateSponsor(request);
            return result.ToActionResult();
        }

        // PUT: api/Default/5
        [HttpPut("{id}")]
        public async Task<ActionResult<SponsorModel>> Put(int id, [FromBody] SponsorUpdateRequest request)
        {
            request.Id = id;
            var result = await SponsorManager.UpdateSponsor(request);
            return result.ToActionResult();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery] bool perm)
        {
            var result = await SponsorManager.DeleteSponsor(new SponsorDeleteRequest { Id = id, Perm = perm });
            return result.ToActionResult();
        }
    }
}