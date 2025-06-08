using BL.Api;
using BL.Services;
using Dal;
using Dal.Api;
using Dal.models;
using Dal.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BL
{
    public class BLManager : IBL
    {
        public IBLUser User { get; }
        public IBLClient Client { get; }
        public IBLFreeQueue FreeQueue { get; }
        public IBLFullQueue FullQueue { get; }
        public IBLStudioService StudioService { get; }
        public BLManager( string connectiondb)
        {
            ServiceCollection services = new ServiceCollection();
            services.AddSingleton<IDal>(d=>new  DalManager(connectiondb));
            services.AddSingleton<IBLClient, BLClientService>();
            services.AddSingleton<DatabaseManager>();
            services.AddSingleton<IBLUser,BLUserService>();
            services.AddSingleton<IBLFreeQueue, BLFreeQueueService>();
            services.AddSingleton<IBLFullQueue, BLFullQueueService>();
            services.AddSingleton<IBLStudioService, BLStudioServiceService>();


            ServiceProvider serviceProvider = services.BuildServiceProvider();
            Client = serviceProvider.GetService<IBLClient>();
            User = serviceProvider.GetService<IBLUser>();
            FullQueue = serviceProvider.GetService<IBLFullQueue>();
            FreeQueue = serviceProvider.GetService<IBLFreeQueue>();
            StudioService = serviceProvider.GetService<IBLStudioService>();

        }
    }
}

