using BL.Models;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLFreeQueue
    {
       
      public List<FreeQueueForClient> GetFreeQueuesForClient();
      public List<FreeQueueForWorker> GetFreeQueuesForWorker(int workerID);
        public List<FreeQueueForClient> GetFreeQueueByDayForClient(DateOnly dateOnly);
        public List<FreeQueueForWorker> GetFreeQueueByDayForWorker(DateOnly dateOnly);
        public FreeQueueForClient GetFreeQueueByDateForClient(DateOnly dateOnly, TimeOnly timeOnly);
      public FreeQueueForWorker GetFreeQueueByDateForWorker(DateOnly dateOnly, TimeOnly timeOnly);
      public void Add(FreeQueueForWorker freeQueue);
      public void Delete(DateOnly dateOnly,TimeOnly timeOnly);
      public void Clear();
      public void Update(FreeQueueForWorker freeQueue);


    }
}
