using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OmahaMTG.Accessors;
using OmahaMTG.Accessors.ContentAccessorContracts;

namespace OmahaMTG.Config
{
    public static class OmahaMtgStartupExtensions
    {
        public static IServiceCollection AddOmahaMtgContent(this IServiceCollection services, OmahaMtgConfig config)
        {
            services.AddDbContext<Data.UserGroupContext>(options =>
                options.UseSqlServer(
                    config.ConnectionString));

            services.AddTransient<IHostManager, ContentAccessor>();
            services.AddTransient<IPostAccessor, ContentAccessor>();
            services.AddTransient<ISponsorManager, ContentAccessor>();
            services.AddTransient<IPresentationManager, ContentAccessor>();
            services.AddTransient<IPresenterManager, ContentAccessor>();
            //services.AddTransient<IMeetingManager, ContentAccessor>();
            services.AddTransient<ITemplateManager, ContentAccessor>();
            return services;
        }

        public static IApplicationBuilder UseOmahaMtgContent(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<Data.UserGroupContext>();
                context.Database.Migrate();
                //context.Database.EnsureDeleted();
                //context.Database.EnsureCreated();

            }

            return app;
        }

    }
}