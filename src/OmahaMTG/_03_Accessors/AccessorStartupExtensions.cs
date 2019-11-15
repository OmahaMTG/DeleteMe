using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace OmahaMTG._03_Accessors
{
    public static class AccessorStartupExtensions
    {
        public static IServiceCollection AddAccessorServices(this IServiceCollection services)
        {

            //services.AddTransient<IHostAccessor, Content.ContentAccessor>();
            //services.AddTransient<ISponsorAccessor, Content.ContentAccessor>();
            //services.AddTransient<IPresenterAccessor, Content.ContentAccessor>();
            //services.AddTransient<IMeetingAccessor, Content.ContentAccessor>();
            //services.AddTransient<ITemplateAccessor, Content.ContentAccessor>();
            return services;
        }

        public static IApplicationBuilder UseAccessorServices(this IApplicationBuilder app)
        {
            return app;
        }
    }
}