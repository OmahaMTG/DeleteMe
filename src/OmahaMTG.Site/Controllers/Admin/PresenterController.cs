using Hero4Hire.Architecture.Managers;
using Microsoft.AspNetCore.Mvc;
using OmahaMTG._00_Model;
using OmahaMTG._00_Model.Admin.Model.Presenter;
using OmahaMTG._01_Managers.Admin.Contract;
using OmahaMTG._05_Data;
using System.Threading.Tasks;

namespace OmahaMTG.Site.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class PresenterController : ControllerBase
    {
        private readonly IManagerFactory<AmbientContext> _managerFactory;

        public PresenterController(IManagerFactory<AmbientContext> managerFactory)
        {
            _managerFactory = managerFactory;
        }

        private IPresenterManager PresenterManager => _managerFactory.CreateManager<IPresenterManager>();


        // GET: api/Default
        [HttpGet]
        public async Task<ActionResult<SkipTakeSet<PresenterModel>>> Get([FromQuery] PresenterQueryRequest request)
        {
            return await PresenterManager.QueryPresenter(request);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PresenterModel>> Get(int id)
        {
            var result = await PresenterManager.GetPresenter(new PresenterGetRequest { Id = id });
            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        // POST: api/Default
        [HttpPost]
        public async Task<ActionResult<PresenterModel>> Post([FromBody] PresenterCreateRequest request)
        {
            return await PresenterManager.CreatePresenter(request);
        }

        // PUT: api/Default/5
        [HttpPut("{id}")]
        public async Task<ActionResult<PresenterModel>> Put(int id, [FromBody] PresenterUpdateRequest request)
        {
            request.Id = id;
            return await PresenterManager.UpdatePresenter(request);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery] bool perm)
        {
            await PresenterManager.DeletePresenter(new PresenterDeleteRequest { Id = id, Perm = perm });
            return Ok();
        }
    }
}