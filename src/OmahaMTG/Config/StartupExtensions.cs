using Hero4Hire.Architecture;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OmahaMTG._00_Model;
using OmahaMTG._01_Managers.Admin;
using OmahaMTG._01_Managers.Admin.Contract;
using OmahaMTG._03_Accessors.Content;
using OmahaMTG._03_Accessors.Content.Contract;
using OmahaMTG.Infrastructure.Data;

namespace OmahaMTG.Config
{
    public static class StartupExtensions
    {
        public static IServiceCollection AddOmahaMtgServices(this IServiceCollection services, OmahaMtgConfig config)
        {
            services.AddDbContext<UserGroupContext>(options =>
                options.UseSqlServer(config.ConnectionString));
            services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<UserGroupContext>();


            services.AddManagerFactory<AmbientContext>();
            services.AddSingleton<IAmbientContextFactory<AmbientContext>, AmbientContextFactory>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddTransient<IHostManager, AdminManager>();
            services.AddTransient<ISponsorManager, AdminManager>();
            services.AddTransient<IPresenterManager, AdminManager>();
            services.AddTransient<IMeetingManager, AdminManager>();
            services.AddTransient<ITemplateManager, AdminManager>();

            services.AddTransient<IHostAccessor, ContentAccessor>();
            services.AddTransient<ISponsorAccessor, ContentAccessor>();
            services.AddTransient<IPresenterAccessor, ContentAccessor>();
            services.AddTransient<IMeetingAccessor, ContentAccessor>();
            services.AddTransient<ITemplateAccessor, ContentAccessor>();
            return services;
        }

        public static IApplicationBuilder UseOmahaMtgServices(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetRequiredService<UserGroupContext>())
                {
                    // context.Database.Migrate();
                    context.Database.EnsureDeleted();
                    context.Database.EnsureCreated();
                }
            }

            return app;
        }
    }
}