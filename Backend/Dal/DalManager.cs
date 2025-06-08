using Dal.Api;
using Dal.models;
using Dal.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Dal
{
    public class DalManager : IDal
    {      
        public IClient Client { get; }

        public IWorker Worker { get; }

        public IFullQueue FullQueue { get; }

        public IFreeQueue FreeQueue { get; }

        public IStudioService StudioService { get; }
        public DalManager(string connectiondb)
        {
            ServiceCollection services = new ServiceCollection();
            services.AddDbContext <DatabaseManager>( options =>options.UseSqlServer(connectiondb));
            services.AddSingleton<IClient, ClientService>();
            services.AddSingleton<IWorker, WorkerService>();
            services.AddSingleton<IFullQueue, FullQueueService>();
            services.AddSingleton<IFreeQueue, FreeQueueService>();
            services.AddSingleton<IStudioService, StudioServiceService>();
            ServiceProvider serviceProvider = services.BuildServiceProvider();


            Client = serviceProvider.GetService<IClient>();
            Worker = serviceProvider.GetService<IWorker>();
            FullQueue = serviceProvider.GetService<IFullQueue>();
            FreeQueue = serviceProvider.GetService<IFreeQueue>();
            StudioService = serviceProvider.GetService<IStudioService>();
        }
    }
}
