using Microsoft.AspNetCore.Mvc;
using OmahaMTG._01_Models.Admin.Sponsor;
using OmahaMTG.Accessors.ContentAccessorContracts;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class SponsorController : ControllerBase
    {
        private readonly ISponsorManager _sponsorAccessor;
        public SponsorController(ISponsorManager sponsorAccessor)
        {
            _sponsorAccessor = sponsorAccessor;
        }

        // GET: api/Default
        [HttpGet]
        public async Task<ActionResult<SkipTakeSet<SponsorModel>>> Get([FromQuery]SponsorQueryRequest request)
        {
            return await _sponsorAccessor.QuerySponsor(request);
        }

        // POST: api/Default
        [HttpPost]
        public async Task<ActionResult<SponsorModel>> Post([FromBody] SponsorCreateRequest request)
        {
            return await _sponsorAccessor.CreateSponsor(request);
        }

        // PUT: api/Default/5
        [HttpPut("{id}")]
        public async Task<ActionResult<SponsorModel>> Put(int id, [FromBody] SponsorUpdateRequest request)
        {
            request.Id = id;
            return await _sponsorAccessor.UpdateSponsor(request);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery]bool perm)
        {
            await _sponsorAccessor.DeleteSponsor(new SponsorDeleteRequest() { Id = id, Perm = perm });
            return Ok();
        }
    }
}
