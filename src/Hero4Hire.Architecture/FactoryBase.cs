using System;
using Microsoft.Extensions.DependencyInjection;

namespace Hero4Hire.Architecture
{
    public abstract class FactoryBase<TAmbientContext> where TAmbientContext : IAmbientContext
    {
        protected FactoryBase(IServiceProvider serviceProvider)
        {
            ServiceProvider = serviceProvider;
        }

        protected FactoryBase(IServiceProvider serviceProvider, TAmbientContext ambientContext)
        {
            AmbientContext = ambientContext;
            ServiceProvider = serviceProvider;
        }

        public IServiceProvider ServiceProvider { get; }
        public TAmbientContext AmbientContext { get; }

        protected T GetInstanceForType<T>()
        {
            return ServiceProvider.GetService<T>();
        }
    }
}