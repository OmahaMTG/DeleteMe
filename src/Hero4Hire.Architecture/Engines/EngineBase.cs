using Hero4Hire.Architecture.Accessors;
using Hero4Hire.Architecture.Utilities;

namespace Hero4Hire.Architecture.Engines
{
    internal abstract class EngineBase<TAmbientContext> : ServiceContractBase<TAmbientContext>
        where TAmbientContext : IAmbientContext
    {
        public AccessorFactory<TAmbientContext> AccessorFactory { get; set; }
        public UtilityFactory<TAmbientContext> UtilityFactory { get; set; }
    }
}