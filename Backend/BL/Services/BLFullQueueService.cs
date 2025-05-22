using BL.Api;
using BL.Models;
using Dal.Api;
using Dal.models;
using Microsoft.EntityFrameworkCore;
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
        private readonly IBLFreeQueue _bLFreeQueue;


        public BLFullQueueService(IDal dal,IBLFreeQueue bLFreeQueue)
        {
            _fullqueue = dal.FullQueue;
            _bLFreeQueue = bLFreeQueue;

        }


  
        public void ValidateFullQueue(FullQueueForClient queue)
        {
            if (queue == null) throw new ArgumentNullException(nameof(queue), "The FullQueue object cannot be null.");
            if (queue.WorkerId <= 0) throw new ArgumentException("WorkerId must be a positive integer.", nameof(queue.WorkerId));
            if (queue.DateTime == default) throw new ArgumentException("DateTime must be a valid date.", nameof(queue.DateTime));
            if (queue.Hour == default) throw new ArgumentException("Hour must be a valid time.", nameof(queue.Hour));
            if (queue.ClientId <= 0) throw new ArgumentException("ClientId must be a positive integer.", nameof(queue.ClientId));
            if (queue.ServiceId <= 0) throw new ArgumentException("ServiceId must be a positive integer.", nameof(queue.ServiceId));
           
        
        }

        public void Add(FullQueueForClient fullQueue)
        {
            ValidateFullQueue(fullQueue);
            FullQueue fullQueue1 = new FullQueue()
            {
                Id = fullQueue.Id,
                WorkerId = fullQueue.WorkerId,
                DateTime = fullQueue.DateTime,
                Hour = fullQueue.Hour,
                ClientId = fullQueue.ClientId,
                ServiceId = fullQueue.ServiceId,
                Status = "Invited"


            };
           
            _fullqueue.Add(fullQueue1);
            _bLFreeQueue.Delete(fullQueue1.DateTime,fullQueue1.Hour);




        }

        public IEnumerable<FullQueueForClient> GetAllForManager()
        {
            List<FullQueueForClient> fullQueueList = new List<FullQueueForClient>();
            _fullqueue.GetAll().ToList()
                .ForEach(fullQueue => fullQueueList.Add(new FullQueueForClient()
                {WorkerId=fullQueue.WorkerId,DateTime=fullQueue.DateTime,Hour=fullQueue.Hour,ClientId=fullQueue.ClientId,ServiceId=fullQueue.ServiceId,Status=fullQueue.Status  }));
            return fullQueueList;
        }


      
        //public void Remove(FullQueueForClient fullQueueForClient)
        //{
        //    FullQueue f = _fullqueue.GetQueueByDate(dateOnly, timeOnly);
        //    try
        //    {

        //        _freeQueue.Delete(f.Id);

        //    }
        //    catch (KeyNotFoundException ex)
        //    {
        //        // טיפול בשגיאה במקרה שהישות לא נמצאה
        //        Console.WriteLine(ex.Message);
        //        throw new InvalidOperationException($"Delete failed: {ex.Message}", ex);

        //    }
        //}

        public void Update(FullQueueForClient entity)
        {
            throw new NotImplementedException();
        }




        public IEnumerable<FullQueueForClient> GetByDate(DateOnly date)
        {
            if (date == default) throw new ArgumentException("Date must be a valid date.", nameof(date));

            List<FullQueueForClient> fullQueueList = new List<FullQueueForClient>();
                 _fullqueue.GetAll()
                .Where(fullQueue => fullQueue.DateTime == date) // מסנן את התורים לפי התאריך
                .ToList()
                .ForEach(fullQueue => fullQueueList.Add(new FullQueueForClient()
                {
                    Id = fullQueue.Id,
                    WorkerId = fullQueue.WorkerId,
                    DateTime = fullQueue.DateTime,
                    Hour = fullQueue.Hour,
                    ClientId = fullQueue.ClientId,
                    ServiceId = fullQueue.ServiceId,
                    Status = fullQueue.Status
                }));
            return fullQueueList;
        }

        public void Remove(FullQueueForClient fullQueueForClient)
        {
            throw new NotImplementedException();
        }
    }
}



  
