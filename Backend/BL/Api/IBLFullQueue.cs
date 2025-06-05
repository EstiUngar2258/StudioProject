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
        public FullQueueForClient Add(FullQueueForAdd fullQueue);

        public void Delete(DateOnly dateOnly, TimeOnly timeOnly);
        public IEnumerable<FullQueueForClient> GetAllForManager();
        public IEnumerable<FullQueueForClient> GetByDate(DateOnly date);
        public FullQueueForClient GetFullQueueByDateForWorker(DateOnly dateOnly, TimeOnly timeOnly);
        public List<FullQueueForClient> GetFullQueueByDayForWorker(DateOnly dateOnly);
        public List<FullQueueForClient> GetFullQueueByDayForClient(DateOnly dateOnly);
        public void Update(FullQueueForClient fullQueue);
        public List<FullQueueForClient> GetfullQueuesForClient(); 
        public FullQueueForClient GetFullQueueByDateForClient(DateOnly dateOnly, TimeOnly timeOnly);
        List<FullQueueForClient> GetfullQueuesForWorker(int workerID);




     
       

    }
}
