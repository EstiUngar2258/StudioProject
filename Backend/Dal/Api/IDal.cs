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
        public IFullQueue FullQueue { get; }
        public IFreeQueue FreeQueue { get; }
        public IStudioService StudioService { get; }

    }
}
