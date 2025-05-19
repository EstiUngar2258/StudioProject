using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IDal
    {
       public IClient Client { get; }
        public IWorker Worker { get; }
        public IFullQueue fullQueue { get; }
        public IFreeQueue freeQueue { get; }
        public IStudioService studioService { get; }

    }
}
