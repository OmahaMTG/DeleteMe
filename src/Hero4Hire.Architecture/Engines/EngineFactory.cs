using System;
using Hero4Hire.Architecture.Accessors;
using Hero4Hire.Architecture.Utilities;

namespace Hero4Hire.Architecture.Engines
{
    public class EngineFactory<TAmbientContext> : FactoryBase<TAmbientContext>
    {
        private AccessorFactory<TAmbientContext> _accessorFactory;
        private UtilityFactory<TAmbientContext> _utilityFactory;

        public EngineFactory(IServiceProvider serviceProvider, TAmbientContext ambientContext, AccessorFactory<TAmbientContext> accessorFactory, UtilityFactory<TAmbientContext> utilityFactory) : base(serviceProvider, ambientContext)
        {
            _utilityFactory = utilityFactory ?? new UtilityFactory<TAmbientContext>(serviceProvider, ambientContext);
            _accessorFactory = accessorFactory ?? new AccessorFactory<TAmbientContext>(serviceProvider, ambientContext, _utilityFactory);
        }

        public T CreateEngine<T>() where T : class
        {
            return CreateEngine<T>(null, null);
        }

        public T CreateEngine<T>(AccessorFactory<TAmbientContext> accessorFactory, UtilityFactory<TAmbientContext> utilityFactory) where T : class
        {
            _accessorFactory = accessorFactory ?? _accessorFactory;
            _utilityFactory = utilityFactory ?? _utilityFactory;

            T result = GetInstanceForType<T>();

            // configure the context and the accessor factory if the result is not a mock
            if (result is EngineBase< TAmbientContext>)
            {
                (result as EngineBase<TAmbientContext>).AmbientContext = AmbientContext;
                (result as EngineBase<TAmbientContext>).AccessorFactory = _accessorFactory;
                (result as EngineBase<TAmbientContext>).UtilityFactory = _utilityFactory;
            }

            return result;
        }
    }
}