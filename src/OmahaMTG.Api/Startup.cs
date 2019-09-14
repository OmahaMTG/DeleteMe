using System.IO;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using OmahaMTG.Api.Data;
using OmahaMTG.Api.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using OmahaMTG.Config;

namespace OmahaMTG.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            OmahaMtgConfig = new OmahaMtgConfig();
            configuration.Bind("ConnectionStrings", OmahaMtgConfig);
        }

        public static byte[] ReadFully(Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }

        OmahaMtgConfig OmahaMtgConfig { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(OmahaMtgConfig.OmahaMtgDbConnectionString));

            services.AddDefaultIdentity<ApplicationUser>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            var assembly = typeof(Startup).GetTypeInfo().Assembly;
            Stream resource = assembly.GetManifestResourceStream("OmahaMTG.Api.certs.myapp.pfx");

            services.AddIdentityServer(options =>
                {
                //   options.
                })
                .AddSigningCredential(new X509Certificate2(ReadFully(resource), "w@terb0y"))
               // .AddDeveloperSigningCredential()
                .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

            services.AddAuthentication()
                .AddIdentityServerJwt();
            ;

            services.AddControllersWithViews();
            services.AddRazorPages();
            services.AddOmahaMtgContent(OmahaMtgConfig);
            //// In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //if (env.IsDevelopment())
            //{
                app.UseDeveloperExceptionPage();
            //    app.UseDatabaseErrorPage();
            //}
            //else
            //{
            //    app.UseExceptionHandler("/Error");
            //    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            //    app.UseHsts();
            //}

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseIdentityServer();
            app.UseAuthentication();//.AddCertificate();
            
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            //app.UseOmahaMtgContent();
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
