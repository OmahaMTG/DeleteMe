using System;

namespace Hero4Hire.Architecture.Utilities
{
    public class UtilityFactory<TAmbientContext> : FactoryBase<TAmbientContext>
    {
        public UtilityFactory(IServiceProvider serviceProvider, TAmbientContext ambientContext) : base(serviceProvider, ambientContext)
        {

        }

        public T CreateUtility<T>() where T : class
        {
            T result = base.GetInstanceForType<T>();

            // Configure the context if the result is not a mock
            if (result is UtilityBase< TAmbientContext>)
                (result as UtilityBase<TAmbientContext>).AmbientContext = AmbientContext;

            return result;
        }
    }
}