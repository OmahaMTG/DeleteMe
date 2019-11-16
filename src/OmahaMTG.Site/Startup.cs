using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OmahaMTG.Config;
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

            var assembly = Assembly.GetAssembly(typeof(OmahaMTG.Config.OmahaMtgConfig));
            services.AddControllersWithViews().AddApplicationPart(assembly).AddControllersAsServices();
            services.AddRazorPages();


            services.AddOmahaMtgServices(OmahaMtgConfig);

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

            app.UseOmahaMtgServices();

            //using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            //{
            //    using (var context = serviceScope.ServiceProvider.GetRequiredService<Data.ApplicationDbContext>())
            //    {
            //        context.Database.Migrate();
            //        // context.Database.EnsureDeleted();
            //        // context.Database.EnsureCreated();
            //    }
            //}
        }
    }
}
