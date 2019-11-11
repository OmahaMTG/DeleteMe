using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OmahaMTG._01_Models;
using OmahaMTG.Accessors.ContentAccessorContracts;
using OmahaMTG.Data;

namespace OmahaMTG.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostAccessor _postAccessor;
        public PostController(IPostAccessor postAccessor)
        {
            _postAccessor = postAccessor;
        }

        // GET: api/Default
        [HttpGet]
        public async Task<ActionResult<SkipTakeSet<PostModel>>> Get([FromQuery]PostQueryRequest request)
        {
            return await _postAccessor.QueryPost(request);
        }

        // POST: api/Default
        [HttpPost]
        public async Task<ActionResult<PostModel>> Post([FromBody] PostCreateRequest request)
        {
            return await _postAccessor.CreatePost(request);
        }

        // PUT: api/Default/5
        [HttpPut("{id}")]
        public async Task<ActionResult<PostModel>> Put(int id, [FromBody] PostUpdateRequest request)
        {
            request.Id = id;
            return await _postAccessor.UpdatePost(request);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery]bool perm)
        {
            await _postAccessor.DeletePost(new PostDeleteRequest() { Id = id, Perm = perm });
            return Ok();
        }
    }
}
