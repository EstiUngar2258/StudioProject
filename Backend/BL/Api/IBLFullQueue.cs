using BL.Models;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLFullQueue
    {
        public void Add(FreeQueue freeQueue,  int clientId, int serviceId, string status);
        public void Remove(FullQueue fullQueue);
        public void Update(FullQueue entity);
        public IEnumerable<FullQueueForClient> GetAllForManager();
    }
}
