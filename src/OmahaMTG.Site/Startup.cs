using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OmahaMTG._01_Managers;
using OmahaMTG._03_Accessors;
using OmahaMTG.Config;
using OmahaMTG.Site.Data;
using System.Reflection;

namespace OmahaMTG.Site
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            OmahaMtgConfig = new OmahaMtgConfig();
            configuration.Bind("OmahaMTGConfig", OmahaMtgConfig);
        }

        OmahaMtgConfig OmahaMtgConfig { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(OmahaMtgConfig.ConnectionString));
            services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<ApplicationDbContext>();

            var assembly = Assembly.GetAssembly(typeof(OmahaMTG.Config.OmahaMtgConfig));
            services.AddControllersWithViews().AddApplicationPart(assembly).AddControllersAsServices();
            services.AddRazorPages();

            //services.AddTransient<FactoryBase<string>>(new Hero4Hire.Architecture.Managers.ManagerFactory<string>(_serviceProvider, "test");)
            //services.AddFactory<IManagerFactory<string>, ManagerFactory<string>>();
            services.AddManagerServices();
            services.AddAccessorServices();
            //services.AddOmahaMtgContent(OmahaMtgConfig);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
            });

            app.UseManagerServices();
            app.UseAccessorServices();

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetRequiredService<Data.ApplicationDbContext>())
                {
                    context.Database.Migrate();
                    // context.Database.EnsureDeleted();
                    // context.Database.EnsureCreated();
                }
            }
        }
    }
}
