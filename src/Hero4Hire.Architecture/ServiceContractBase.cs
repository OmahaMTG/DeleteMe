using System;
using System.Collections.Generic;
using System.Text;

namespace Hero4Hire.Architecture
{
    public class ServiceContractBase<TAmbientContext> where TAmbientContext : IAmbientContext
    {
        public TAmbientContext AmbientContext { get; set; }
    }
}
