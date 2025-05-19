//using Dal.Api;
//using Dal.Services;
//using Dal.models;
//using Microsoft.AspNetCore.Cors.Infrastructure;
//using Dal;
//var builder = WebApplication.CreateBuilder(args);
//builder.Services.AddControllers();
//builder.Services.AddSingleton<IDal, DalManager>();
////builder.Services.AddSingleton<IBLProduct, BlProductService>();
//var app = builder.Build();
//app.MapControllers();
//app.Run();



using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}
