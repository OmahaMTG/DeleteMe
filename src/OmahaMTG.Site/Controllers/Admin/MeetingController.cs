using Hero4Hire.Architecture.Managers;
using Microsoft.AspNetCore.Mvc;
using OmahaMTG._00_Model;
using OmahaMTG._00_Model.Admin.Model.Meeting;
using OmahaMTG._01_Managers.Admin.Contract;
using OmahaMTG._05_Data;
using System.Threading.Tasks;

namespace OmahaMTG.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingController : ControllerBase
    {
        private readonly IManagerFactory<AmbientContext> _managerFactory;

        public MeetingController(IManagerFactory<AmbientContext> managerFactory)
        {
            _managerFactory = managerFactory;
        }

        private IMeetingManager MeetingManager => _managerFactory.CreateManager<IMeetingManager>();


        // GET: api/Default
        [HttpGet]
        public async Task<ActionResult<SkipTakeSet<MeetingModel>>> Get([FromQuery]MeetingQueryRequest request)
        {
            var result = await MeetingManager.QueryMeeting(request);
            return result.ToActionResult();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MeetingModel>> Get(int id)
        {
            var result = await MeetingManager.GetMeeting(new MeetingGetRequest() { Id = id });
            return result.ToActionResult();
        }

        // POST: api/Default
        [HttpPost]
        public async Task<ActionResult<MeetingModel>> Post([FromBody] MeetingCreateRequest request)
        {
            var result = await MeetingManager.CreateMeeting(request);
            System.Diagnostics.Debug.WriteLine(result);
            return result.ToActionResult();
        }

        // PUT: api/Default/5
        [HttpPut("{id}")]
        public async Task<ActionResult<MeetingModel>> Put(int id, [FromBody] MeetingUpdateRequest request)
        {
            request.Id = id;
            var result = await MeetingManager.UpdateMeeting(request);
            return result.ToActionResult();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery]bool perm)
        {
            var result = await MeetingManager.DeleteMeeting(new MeetingDeleteRequest() { Id = id, Perm = perm });
            return result.ToActionResult();
        }
    }
}

