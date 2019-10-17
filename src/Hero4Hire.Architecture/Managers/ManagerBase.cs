using Hero4Hire.Architecture.Accessors;
using Hero4Hire.Architecture.Engines;
using Hero4Hire.Architecture.Utilities;

namespace Hero4Hire.Architecture.Managers
{
    public abstract class ManagerBase<TAmbientContext> : ServiceContractBase<TAmbientContext>
    {
        public EngineFactory<TAmbientContext> EngineFactory { get; set; }
        public AccessorFactory<TAmbientContext> AccessorFactory { get; set; }
        public UtilityFactory<TAmbientContext> UtilityFactory { get; set; }

        protected ManagerBase()
        {

        }
    }
}