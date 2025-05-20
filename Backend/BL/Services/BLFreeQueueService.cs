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
    public class BLFreeQueueService : IBLFreeQueue
    {
        private readonly IFreeQueue _freeQueue;
        public BLFreeQueueService(IDal dal)
        {
            _freeQueue = dal.FreeQueue;

        }

        public void Add(FreeQueueForWorker freeQueue)
        {
            ValidateFreeQueueForWorker(freeQueue);
            FreeQueue toAdd = new()
            {
                Id = freeQueue.Id,
                DateTime = freeQueue.DateTime,
                Hour = freeQueue.Hour,
                WorkerId = freeQueue.WorkerId,

            };
            //הימור לfreeQueue
            _freeQueue.Add(toAdd);

            // אם כל הבדיקות עברו, ניתן להוסיף את ה-freeQueue
            // הוספת הלוגיקה להוספה כאן
        }

        private void ValidateFreeQueueForWorker(FreeQueueForWorker freeQueue)
        {
            if (freeQueue == null)
            {
                throw new ArgumentNullException(nameof(freeQueue), "The freeQueue cannot be null.");
            }

            if (freeQueue.WorkerId <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(freeQueue.WorkerId), "WorkerId must be greater than zero.");
            }

            if (freeQueue.DateTime == default)
            {
                throw new ArgumentException("DateTime must be a valid date.", nameof(freeQueue.DateTime));
            }

            if (freeQueue.Hour == default)
            {
                throw new ArgumentException("Hour must be a valid time.", nameof(freeQueue.Hour));
            }
        }

        public void Clear()
        {
            _freeQueue.GetAll().ToList().Clear();
        }



        public FreeQueueForClient GetFreeQueueByDateForClient(DateOnly dateOnly, TimeOnly timeOnly)
        {
            try
            {
                FreeQueue c = _freeQueue.GetQueueByDate(dateOnly, timeOnly);
                FreeQueueForClient freeQueueForClient = new ()
                {
                    Id = c.Id,
                    DateTime = c.DateTime,
                    Hour = c.Hour,

                };
                return freeQueueForClient;
            }
            catch (KeyNotFoundException ex)
            {
                // טיפול בשגיאה במקרה שהישות לא נמצאה
                Console.WriteLine(ex.Message);
                throw new InvalidOperationException($"GetFreeQueueByDate failed: {ex.Message}", ex);

            }
        }

        public FreeQueueForWorker GetFreeQueueByDateForWorker(DateOnly dateOnly, TimeOnly timeOnly)
        {
            try
            {
                FreeQueue c = _freeQueue.GetQueueByDate(dateOnly, timeOnly);
                FreeQueueForWorker freeQueueForWorker = new()
                {
                    Id = c.Id,
                    DateTime = c.DateTime,
                    Hour = c.Hour,
                    WorkerId = c.WorkerId,

                };
                return freeQueueForWorker;
            }
            catch (KeyNotFoundException ex)
            {
                // טיפול בשגיאה במקרה שהישות לא נמצאה
                Console.WriteLine(ex.Message);
                throw new InvalidOperationException($"GetFreeQueueByDate failed: {ex.Message}", ex);

            }
        }

        public List<FreeQueueForClient> GetFreeQueuesForClient()
        {
            List<FreeQueueForClient> queueForClient = new();
            _freeQueue.GetAll().ToList().ForEach(freeQueu => queueForClient.Add(new FreeQueueForClient()
            {
                DateTime = freeQueu.DateTime,
                Hour = freeQueu.Hour,
                Id = freeQueu.Id,


            }));
            return queueForClient;
        }

        public List<FreeQueueForWorker> GetFreeQueuesForWorker(int workerID)
        {
            try
            {
                List<FreeQueue> list =
                _freeQueue.GetAll().Where(fq => fq.WorkerId == workerID).ToList();
                List<FreeQueueForWorker> queueForWorker = new();
                list.ForEach(freeQueu => queueForWorker.Add(new FreeQueueForWorker()
                {
                    DateTime = freeQueu.DateTime,
                    Hour = freeQueu.Hour,
                    Id = freeQueu.Id,
                    WorkerId = workerID

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
            FreeQueue f = _freeQueue.GetQueueByDate(dateOnly, timeOnly);
            try
            {

                _freeQueue.Delete(f.Id);

            }
            catch (KeyNotFoundException ex)
            {
                // טיפול בשגיאה במקרה שהישות לא נמצאה
                Console.WriteLine(ex.Message);
                throw new InvalidOperationException($"Delete failed: {ex.Message}", ex);

            }
        }

        public void Update(FreeQueueForWorker freeQueue)
        {
            ValidateFreeQueueForWorker(freeQueue);
            {

                try
                {
                    FreeQueue freeQueue1 = new FreeQueue()
                    {
                        Id = freeQueue.Id,
                        WorkerId = freeQueue.WorkerId,
                        DateTime = freeQueue.DateTime,
                        Hour = freeQueue.Hour,

                    };
                    _freeQueue.Update(freeQueue1);
                }
                catch (KeyNotFoundException ex)
                {
                    // טיפול בשגיאה במקרה שהישות לא נמצאה
                    throw new InvalidOperationException($"Update failed: {ex.Message}", ex);
                }


            }

        }

    }
    }
