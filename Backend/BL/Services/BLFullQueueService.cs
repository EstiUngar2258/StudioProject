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
        public void ValidateFullQueueAdd(FullQueueForAdd queue)
        {
            if (queue == null) throw new ArgumentNullException(nameof(queue), "The FullQueue object cannot be null.");
            if (queue.DateTime == default) throw new ArgumentException("DateTime must be a valid date.", nameof(queue.DateTime));
            if (queue.Hour == default) throw new ArgumentException("Hour must be a valid time.", nameof(queue.Hour));
            if (queue.ClientId <= 0) throw new ArgumentException("ClientId must be a positive integer.", nameof(queue.ClientId));
            if (queue.ServiceId <= 0) throw new ArgumentException("ServiceId must be a positive integer.", nameof(queue.ServiceId));


        }

        public FullQueueForClient Add(FullQueueForAdd fullQueue)
        {
            ValidateFullQueueAdd(fullQueue);
            FullQueue fullQueue1 = new FullQueue()
            {
                Id = fullQueue.Id,
                DateTime = fullQueue.DateTime,
                Hour = fullQueue.Hour,
                ClientId = fullQueue.ClientId,
                ServiceId = fullQueue.ServiceId,
                Status = "Invited"


            };
          
            FreeQueueForWorker c=_bLFreeQueue.GetFreeQueueByDateForWorker(fullQueue1.DateTime, fullQueue1.Hour);
            fullQueue1.WorkerId = c.WorkerId;
            FullQueueForClient freeQueueForClient = new()
            {
                Id = fullQueue1.Id,
                WorkerId= fullQueue1.WorkerId,
                DateTime = fullQueue1.DateTime,
                Hour = fullQueue1.Hour,
                ClientId = fullQueue1.ClientId,
                ServiceId = fullQueue1.ServiceId,
                Status = "Invited"
            };
            _fullqueue.Add(fullQueue1);
            _bLFreeQueue.Delete(fullQueue1.DateTime, fullQueue1.Hour);
            return freeQueueForClient;

        }


        
        public IEnumerable<FullQueueForClient> GetAllForManager()
        {
            List<FullQueueForClient> fullQueueList = new List<FullQueueForClient>();
            _fullqueue.GetAll().ToList()
                .ForEach(fullQueue => fullQueueList.Add(new FullQueueForClient()
                {WorkerId=fullQueue.WorkerId,DateTime=fullQueue.DateTime,Hour=fullQueue.Hour,ClientId=fullQueue.ClientId,ServiceId=fullQueue.ServiceId,Status=fullQueue.Status  }));
            return fullQueueList;
        }




        public FullQueueForClient GetFullQueueByDateForClient(DateOnly dateOnly, TimeOnly timeOnly)
        {
            try
            {
               FullQueue c = _fullqueue.GetQueueByDate(dateOnly, timeOnly);
                FullQueueForClient fullQueueForClient = new()
                {
                    Id = c.Id,
                    DateTime = c.DateTime,
                    Hour = c.Hour,
                };
                return fullQueueForClient;
            }
            catch (KeyNotFoundException ex)
            {
                // טיפול בשגיאה במקרה שהישות לא נמצאה
                Console.WriteLine(ex.Message);
                throw new InvalidOperationException($"GetFreeQueueByDate failed: {ex.Message}", ex);

            }
        }


        public FullQueueForClient GetFullQueueByDateForWorker(DateOnly dateOnly, TimeOnly timeOnly)
        {
            try
            {
                FullQueue c = _fullqueue.GetQueueByDate(dateOnly, timeOnly);
                FullQueueForClient fullQueueForWorker = new()
                {

                    Id = c.Id,
                    DateTime = c.DateTime,
                    Hour = c.Hour,
                    WorkerId = c.WorkerId,

                };
                return fullQueueForWorker;
            }
            catch (KeyNotFoundException ex)
            {
                // טיפול בשגיאה במקרה שהישות לא נמצאה
                Console.WriteLine(ex.Message);
                throw new InvalidOperationException($"GetFreeQueueByDate failed: {ex.Message}", ex);

            }
        }


        public List<FullQueueForClient> GetfullQueuesForClient()
        {
            List<FullQueueForClient> queueForClient = new();
            _fullqueue.GetAll().ToList().ForEach(fullQueue => queueForClient.Add(new FullQueueForClient()
            {
                DateTime = fullQueue.DateTime,
                Hour = fullQueue.Hour,
                Id = fullQueue.Id,


            }));
            return queueForClient;
        }

        public List<FullQueueForClient> GetfullQueuesForWorker(int workerID)
        {
            try
            {
                List<FullQueue> list =
                _fullqueue.GetAll().Where(fq => fq.WorkerId == workerID).ToList();
                if (list.Count == 0)
                    list =_fullqueue.GetAll().Where(fq => fq.ClientId == workerID).ToList();
                List<FullQueueForClient> queueForWorker = new();
                list.ForEach(fullQueue => queueForWorker.Add(new FullQueueForClient()
                {
                    DateTime = fullQueue.DateTime,
                    Hour = fullQueue.Hour,
                    Id = fullQueue.Id,
                    WorkerId = fullQueue.WorkerId,
                    ClientId= fullQueue.ClientId,
                    ServiceId = fullQueue.ServiceId,
                    Status = fullQueue.Status


                }));
                return queueForWorker;
            }
            catch (KeyNotFoundException ex)
            {
                // טיפול בשגיאה במקרה שהישות לא נמצאה
                Console.WriteLine(ex.Message);
                throw new InvalidOperationException($"GetFreeQueuesForWorker failed: {ex.Message}", ex);

            }
        }

        public void Delete(DateOnly dateOnly, TimeOnly timeOnly)
        {
            FullQueue f = _fullqueue.GetQueueByDate(dateOnly, timeOnly);
            try
            {

                _fullqueue.Delete(f.Id);

            }
            catch (KeyNotFoundException ex)
            {
                // טיפול בשגיאה במקרה שהישות לא נמצאה
                Console.WriteLine(ex.Message);
                throw new InvalidOperationException($"Delete failed: {ex.Message}", ex);

            }
        }

        public void Update(FullQueueForClient fullQueue)
        {
            ValidateFullQueue(fullQueue);
            {
                try
                {
                    FullQueue fullQueue1 = new FullQueue()
                    {
                        Id = fullQueue.Id,
                        WorkerId = fullQueue.WorkerId,
                        DateTime = fullQueue.DateTime,
                        Hour = fullQueue.Hour,

                    };
                    _fullqueue.Update(fullQueue1);
                }
                catch (KeyNotFoundException ex)
                {
                    // טיפול בשגיאה במקרה שהישות לא נמצאה
                    throw new InvalidOperationException($"Update failed: {ex.Message}", ex);
                }


            }

        }


        public List<FullQueueForClient> GetFullQueueByDayForClient(DateOnly dateOnly)
        {
            try
            {
                List<FullQueue> list =
                _fullqueue.GetQueueByDate(dateOnly);
                List<FullQueueForClient> queueForClient = new();
                list.ForEach(fullQueu => queueForClient.Add(new FullQueueForClient()
                {
                    DateTime = fullQueu.DateTime,
                    Hour = fullQueu.Hour,
                    Id = fullQueu.Id

                }));
                return queueForClient;
            }
            catch (KeyNotFoundException ex)
            {
                // טיפול בשגיאה במקרה שהישות לא נמצאה
                Console.WriteLine(ex.Message);
                throw new InvalidOperationException($"GetFreeQueuesForClient failed: {ex.Message}", ex);

            }
        }

        public List<FullQueueForClient> GetFullQueueByDayForWorker(DateOnly dateOnly)
        {
            try
            {
                List<FullQueue> list =
                _fullqueue.GetQueueByDate(dateOnly);
                List<FullQueueForClient> queueForWorker = new();
                list.ForEach(fullQueue => queueForWorker.Add(new FullQueueForClient()
                {
                    DateTime = fullQueue.DateTime,
                    Hour = fullQueue.Hour,
                    Id = fullQueue.Id

                }));
                return queueForWorker;
            }
            catch (KeyNotFoundException ex)
            {
                // טיפול בשגיאה במקרה שהישות לא נמצאה
                Console.WriteLine(ex.Message);
                throw new InvalidOperationException($"GetFreeQueuesForClient failed: {ex.Message}", ex);

            }
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



  
