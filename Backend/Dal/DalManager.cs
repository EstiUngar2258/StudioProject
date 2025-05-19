using Dal.Api;
using Dal.models;
using Dal.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Dal
{
    public class DalManager : IDal
    {      
        public IClient Client { get; }

        public IWorker Worker { get; }

        public IFullQueue fullQueue { get; }

        public IFreeQueue freeQueue { get; }

        public IStudioService studioService { get; }
        public DalManager()
        {
            ServiceCollection services = new ServiceCollection();
            services.AddSingleton<DatabaseManager>();
            services.AddSingleton<IClient, ClientService>();
            services.AddSingleton<IWorker, WorkerService>();
            ServiceProvider serviceProvider = services.BuildServiceProvider();


            Client = serviceProvider.GetService<IClient>();
            Worker = serviceProvider.GetService<IWorker>();
        }
    }
}
