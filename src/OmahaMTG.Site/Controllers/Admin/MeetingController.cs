using Hero4Hire.Architecture.Managers;
using Microsoft.AspNetCore.Mvc;
using OmahaMTG._00_Common;
using OmahaMTG._01_Managers.Admin.Contract;
using OmahaMTG._01_Managers.Admin.Model.Meeting;
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
            return await MeetingManager.QueryMeeting(request);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MeetingModel>> Get(int id)
        {
            return await MeetingManager.GetMeeting(new MeetingGetRequest() { Id = id });
        }

        // POST: api/Default
        [HttpPost]
        public async Task<ActionResult<MeetingModel>> Post([FromBody] MeetingCreateRequest request)
        {
            return await MeetingManager.CreateMeeting(request);
        }

        // PUT: api/Default/5
        [HttpPut("{id}")]
        public async Task<ActionResult<MeetingModel>> Put(int id, [FromBody] MeetingUpdateRequest request)
        {
            request.Id = id;
            return await MeetingManager.UpdateMeeting(request);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery]bool perm)
        {
            await MeetingManager.DeleteMeeting(new MeetingDeleteRequest() { Id = id, Perm = perm });
            return Ok();
        }
    }
}

