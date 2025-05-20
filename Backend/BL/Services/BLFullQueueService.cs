using BL.Api;
using BL.Models;
using Dal.Api;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class BLFullQueueService : IBLFullQueue
    {

        private readonly IFullQueue _fullqueue;

        public BLFullQueueService(IDal dal)
        {
            _fullqueue = dal.FullQueue;

        }


        public void Add(FreeQueue freeQueue, int clientId, int serviceId, string status)
        {
            FullQueue fullQueue = new()
            {
               
                DateTime = freeQueue.DateTime, // הנחה שהתאריך מגיע מאובייקט התור הריק
                Hour = freeQueue.Hour, // הנחה שהשעה מגיעה מאובייקט התור הריק
                ClientId = clientId,
                ServiceId = serviceId,
                Status = status,
                Id = freeQueue.Id   
            };

           _fullqueue.Add(fullQueue);
            
        }

        public IEnumerable<FullQueueForClient> GetAllForManager()
        {
            List<FullQueueForClient> fullQueueList = new List<FullQueueForClient>();
            _fullqueue.GetAll().ToList()
                .ForEach(fullQueue => fullQueueList.Add(new FullQueueForClient()
                {WorkerId=fullQueue.WorkerId,DateTime=fullQueue.DateTime,Hour=fullQueue.Hour,ClientId=fullQueue.ClientId,ServiceId=fullQueue.ServiceId,Status=fullQueue.Status,Id=fullQueue.Id  }));
            return fullQueueList;
        }


        public void Remove(FullQueue fullQueue)
        {
           
        }

        public void Update(FullQueue entity)
        {
            throw new NotImplementedException();
        }
    }
}



  
