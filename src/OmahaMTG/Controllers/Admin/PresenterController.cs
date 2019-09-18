using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OmahaMTG.Accessors.ContentAccessorContracts;
using OmahaMTG.Data;

namespace OmahaMTG.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class PresenterController : ControllerBase
    {
        private readonly IPresenterAccessor _presenterAccessor;
        public PresenterController(IPresenterAccessor presenterAccessor)
        {
            _presenterAccessor = presenterAccessor;
        }

        // GET: api/Default
        [HttpGet]
        public async Task<ActionResult<SkipTakeSet<PresenterModel>>> Get([FromQuery]PresenterQueryRequest request)
        {
            return await _presenterAccessor.QueryPresenter(request);
        }

        // POST: api/Default
        [HttpPost]
        public async Task<ActionResult<PresenterModel>> Post([FromBody] PresenterCreateRequest request)
        {
            return await _presenterAccessor.CreatePresenter(request);
        }

        // PUT: api/Default/5
        [HttpPut("{id}")]
        public async Task<ActionResult<PresenterModel>> Put(int id, [FromBody] PresenterUpdateRequest request)
        {
            request.Id = id;
            return await _presenterAccessor.UpdatePresenter(request);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery]bool perm)
        {
            await _presenterAccessor.DeletePresenter(new PresenterDeleteRequest() { Id = id, Perm = perm });
            return Ok();
        }
    }
}
