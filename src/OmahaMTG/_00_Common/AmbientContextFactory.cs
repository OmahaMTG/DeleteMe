using Hero4Hire.Architecture;
using System.Collections.Generic;

namespace OmahaMTG._00_Common
{
    public class AmbientContextFactory : IAmbientContextFactory<AmbientContext>
    {
        public AmbientContext BuildAmbientContext()
        {
            return new AmbientContext() { UserId = "one", Roles = new List<string>() };
        }
    }
}