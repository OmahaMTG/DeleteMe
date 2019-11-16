using System.Collections.Generic;
using Hero4Hire.Architecture;
using Microsoft.AspNetCore.Http;

namespace OmahaMTG._00_Common
{
    public class AmbientContextFactory : IAmbientContextFactory<AmbientContext>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AmbientContextFactory(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public AmbientContext BuildAmbientContext()
        {
            // var user = _httpContextAccessorr.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return new AmbientContext {UserId = "one", Roles = new List<string>()};
        }
    }
}