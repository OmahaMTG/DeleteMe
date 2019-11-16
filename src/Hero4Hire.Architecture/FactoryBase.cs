using System;
using Microsoft.Extensions.DependencyInjection;

namespace Hero4Hire.Architecture
{
    public abstract class FactoryBase<TAmbientContext> where TAmbientContext : IAmbientContext
    {
        public IServiceProvider ServiceProvider { get; private set; }
        public TAmbientContext AmbientContext { get; private set; }

        protected FactoryBase(IServiceProvider serviceProvider)
        {
            ServiceProvider = serviceProvider;
        }

        protected FactoryBase(IServiceProvider serviceProvider, TAmbientContext ambientContext)
        {
            AmbientContext = ambientContext;
            ServiceProvider = serviceProvider;
        }

        protected T GetInstanceForType<T>()
        {
            return ServiceProvider.GetService<T>();
        }
    }
}