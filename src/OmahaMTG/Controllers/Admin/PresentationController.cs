using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OmahaMTG.Accessors.ContentAccessorContracts;
using OmahaMTG.Data;

namespace OmahaMTG.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class PresentationController : ControllerBase
    {
        private readonly IPresentationAccessor _presentationAccessor;
        public PresentationController(IPresentationAccessor presentationAccessor)
        {
            _presentationAccessor = presentationAccessor;
        }

        // GET: api/Default
        [HttpGet]
        public async Task<ActionResult<SkipTakeSet<PresentationModel>>> Get([FromQuery]PresentationQueryRequest request)
        {
            return await _presentationAccessor.QueryPresentation(request);
        }

        // POST: api/Default
        [HttpPost]
        public async Task<ActionResult<PresentationModel>> Post([FromBody] PresentationCreateRequest request)
        {
            return await _presentationAccessor.CreatePresentation(request);
        }

        // PUT: api/Default/5
        [HttpPut("{id}")]
        public async Task<ActionResult<PresentationModel>> Put(int id, [FromBody] PresentationUpdateRequest request)
        {
            request.Id = id;
            return await _presentationAccessor.UpdatePresentation(request);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery]bool perm)
        {
            await _presentationAccessor.DeletePresentation(new PresentationDeleteRequest() { Id = id, Perm = perm });
            return Ok();
        }
    }
}
