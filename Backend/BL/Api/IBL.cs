using Dal.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBL
    {
        public IBLClient Client { get; }
        public IBLUser User { get; }
        public IBLFullQueue FullQueue { get; }
        public IBLFreeQueue FreeQueue { get; }
    }
}
