using BL.Api;
using BL.Services;
using BL;
using Dal.Api;
using Dal.models;
using Dal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;

public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }




    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        //services.AddSingleton<IDal, DalManager>();
        services.AddScoped<IBL> ( bl=> new BLManager(_configuration.GetConnectionString("DefaultConnection"))); // שונה ל-Scoped
        //services.AddScoped<IBLClient, BLClientService>(); // שונה ל-Scoped
       // services.AddScoped<BLUserService>(); // שונה ל-Scoped
        //services.AddScoped<BLFullQueueService>();

        // הוספת DbContext עם מחרוזת החיבור
        //services.AddDbContext<DatabaseManager>(options =>
        //    options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));

        // הוספת הגדרת CORS
        services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin",

                builder => builder.WithOrigins("http://localhost:5174") // החלף בכתובת המתאימה

                                  .AllowAnyMethod()
                                  .AllowAnyHeader());
        });
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
        });

    }


    public void Configure(IApplicationBuilder app)
    {
        app.UseRouting();
        app.UseCors("AllowSpecificOrigin"); // הפעלת CORS
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers(); // הוספת נקודות קצה
        });
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        });

    }

}
