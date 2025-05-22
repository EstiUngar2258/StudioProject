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
        public void Add(FullQueueForClient fullQueue);
        public void Remove(FullQueueForClient fullQueueForClient);
        public void Update(FullQueueForClient entity);
        public IEnumerable<FullQueueForClient> GetAllForManager();
        public IEnumerable<FullQueueForClient> GetByDate(DateOnly date);
    }
}
