using System.Collections.Generic;
using Hero4Hire.Architecture;

namespace OmahaMTG._00_Model
{
    public class AmbientContext : IAmbientContext
    {
        public string UserId { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}