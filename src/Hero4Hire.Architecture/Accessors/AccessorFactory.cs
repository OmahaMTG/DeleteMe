using System;
using Hero4Hire.Architecture.Utilities;

namespace Hero4Hire.Architecture.Accessors
{
    public class AccessorFactory<TAmbientContext> : FactoryBase<TAmbientContext>
    {
        private UtilityFactory<TAmbientContext> _utilityFactory;

        public AccessorFactory(IServiceProvider serviceProvider, TAmbientContext ambientContext, UtilityFactory<TAmbientContext> utilityFactory) : base(serviceProvider, ambientContext)
        {
            _utilityFactory = utilityFactory ?? new UtilityFactory<TAmbientContext>(serviceProvider, ambientContext);
        }

        public T CreateAccessor<T>() where T : class
        {
            return CreateAccessor<T>(null);
        }

        public T CreateAccessor<T>(UtilityFactory<TAmbientContext> utilityFactory) where T : class
        {
            _utilityFactory = utilityFactory ?? _utilityFactory;

            T result = GetInstanceForType<T>();

            var @base = result as AccessorBase<TAmbientContext>;
            if (@base != null)
            {
                @base.AmbientContext = AmbientContext;
                @base.UtilityFactory = _utilityFactory;
            }

            return result;
        }

    }
}