using Hero4Hire.Architecture.Accessors;
using Hero4Hire.Architecture.Engines;
using Hero4Hire.Architecture.Utilities;

namespace Hero4Hire.Architecture.Managers
{
    public interface IManagerFactory<TAmbientContext> where TAmbientContext : IAmbientContext
    {
        T CreateManager<T>() where T : class;

        T CreateManager<T>(
            EngineFactory<TAmbientContext> engineFactory, AccessorFactory<TAmbientContext> accessorFactory,
            UtilityFactory<TAmbientContext> utilityFactory) where T : class;
    }
}