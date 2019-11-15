using Hero4Hire.Architecture.Accessors;
using Hero4Hire.Architecture.Engines;
using Hero4Hire.Architecture.Utilities;
using System;

namespace Hero4Hire.Architecture.Managers
{


    public class ManagerFactory<TAmbientContext> : FactoryBase<TAmbientContext>, IManagerFactory<TAmbientContext>
    {
        public ManagerFactory(IServiceProvider serviceProvider, Func<TAmbientContext> ambientContextFactory) : base(serviceProvider, ambientContextFactory())
        {

        }

        public T CreateManager<T>() where T : class
        {
            T result = CreateManager<T>(null, null, null);
            return result;
        }

        public T CreateManager<T>(
            EngineFactory<TAmbientContext> engineFactory, AccessorFactory<TAmbientContext> accessorFactory, UtilityFactory<TAmbientContext> utilityFactory) where T : class
        {
            if (AmbientContext == null)
            {
                throw new InvalidOperationException("Context cannot be null");
            }

            if (utilityFactory == null)
            {
                utilityFactory = new UtilityFactory<TAmbientContext>(ServiceProvider, AmbientContext);
            }

            if (accessorFactory == null)
            {
                accessorFactory = new AccessorFactory<TAmbientContext>(ServiceProvider, AmbientContext, utilityFactory);
            }

            if (engineFactory == null)
            {
                engineFactory = new EngineFactory<TAmbientContext>(ServiceProvider, AmbientContext, accessorFactory, utilityFactory);
            }

            T result = GetInstanceForType<T>();

            var @base = result as ManagerBase<TAmbientContext>;
            if (@base != null)
            {
                @base.AmbientContext = AmbientContext;
                @base.EngineFactory = engineFactory;
                @base.AccessorFactory = accessorFactory;
                @base.UtilityFactory = utilityFactory;
            }
            else
                throw new InvalidOperationException($"{typeof(T).Name} does not implement ManagerBase");

            return result;
        }
    }
}