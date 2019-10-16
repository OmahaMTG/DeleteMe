using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
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

            services.AddTransient<IHostAccessor, ContentAccessor>();
            services.AddTransient<IPostAccessor, ContentAccessor>();
            services.AddTransient<ISponsorAccessor, ContentAccessor>();
            services.AddTransient<IPresentationAccessor, ContentAccessor>();
            services.AddTransient<IPresenterAccessor, ContentAccessor>();
            services.AddTransient<IMeetingAccessor, ContentAccessor>();
            services.AddTransient<ITemplateAccessor, ContentAccessor>();
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