// ***********************************************************************************************
// Copyright (c) 2021 SmartIT Consultation
/* John Kocer
Author/ IT Consultant / Sr. Technical Lead / Architect
smartit.consultation@gmail.com
Twitter :  https://twitter.com/jkocer
Amazon: https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=john+kocer
LinkedIn: https://www.linkedin.com/in/john-kocer-117a7662/
http://www.c-sharpcorner.com/members/john2098
https://johnkocer.github.io/
*/
// ***********************************************************************************************


using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace EmployeeWebApi
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors();
      services.AddControllers();
      services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo {Title = "My API", Version = "v1"}); });
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      app.UseSwagger();

      // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
      // specifying the Swagger JSON endpoint.
      app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"); });
      app.UseDeveloperExceptionPage();
      app.UseStaticFiles();
      app.UseRouting();

      // global cors policy
      app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

      //app.UseAuthentication();
      //app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllerRoute(
          "default",
          "{controller=Home}/{action=Index}/{id?}");
      });
    }
  }
}