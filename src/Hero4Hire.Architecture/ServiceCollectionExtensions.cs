using Hero4Hire.Architecture.Managers;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Hero4Hire.Architecture
{
    public static class ServiceCollectionExtensions
    {
        public static void AddFactory<TService, TImplementation>(this IServiceCollection services)
            where TService : class
            where TImplementation : class, TService
        {
            services.AddTransient<TService, TImplementation>();
            services.AddSingleton<Func<TService>>(x => x.GetService<TService>);
        }

        public static void AddManagerFactory<TAmbientContext>(this IServiceCollection services) where TAmbientContext : IAmbientContext
        {
            services.AddTransient(typeof(IManagerFactory<TAmbientContext>), typeof(ManagerFactory<TAmbientContext>));
            //services.AddTransient<>
        }
    }
}