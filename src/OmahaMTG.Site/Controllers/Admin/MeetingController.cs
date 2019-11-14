//using Microsoft.AspNetCore.Mvc;
//using OmahaMTG.Accessors.ContentAccessorContracts;
//using OmahaMTG.Data;
//using System.Threading.Tasks;
//using OmahaMTG._01_Managers.Admin.Model.Meeting;

//namespace OmahaMTG.Controllers.Admin
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class MeetingController : ControllerBase
//    {
//        private readonly IMeetingManager _meetingAccessor;
//        public MeetingController(IMeetingManager meetingAccessor)
//        {
//            _meetingAccessor = meetingAccessor;
//        }

//        // GET: api/Default
//        [HttpGet]
//        public async Task<ActionResult<SkipTakeSet<MeetingModel>>> Get([FromQuery]MeetingQueryRequest request)
//        {
//            return await _meetingAccessor.QueryMeeting(request);
//        }

//        // POST: api/Default
//        [HttpPost]
//        public async Task<ActionResult<MeetingModel>> Post([FromBody] MeetingCreateRequest request)
//        {
//            return await _meetingAccessor.CreateMeeting(request);
//        }

//        // PUT: api/Default/5
//        [HttpPut("{id}")]
//        public async Task<ActionResult<MeetingModel>> Put(int id, [FromBody] MeetingUpdateRequest request)
//        {
//            request.Id = id;
//            return await _meetingAccessor.UpdateMeeting(request);
//        }

//        // DELETE: api/ApiWithActions/5
//        [HttpDelete("{id}")]
//        public async Task<ActionResult> Delete(int id, [FromQuery]bool perm)
//        {
//            await _meetingAccessor.DeleteMeeting(new MeetingDeleteRequest() { Id = id, Perm = perm });
//            return Ok();
//        }
//    }
//}
