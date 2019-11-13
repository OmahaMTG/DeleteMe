using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using OmahaMTG._01_Managers.Admin;
using OmahaMTG._01_Managers.Admin.Contract;

namespace OmahaMTG._01_Managers
{
    public static class AccessorStartupExtensions
    {
        public static IServiceCollection AddManagerServices(this IServiceCollection services)
        {

            services.AddTransient<IHostManager, AdminManager>();
            services.AddTransient<ISponsorManager, AdminManager>();
            services.AddTransient<IPresenterManager, AdminManager>();
            services.AddTransient<IMeetingManager, AdminManager>();
            services.AddTransient<ITemplateManager, AdminManager>();
            return services;
        }

        public static IApplicationBuilder UseManagerServices(this IApplicationBuilder app)
        {
            return app;
        }
    }
}