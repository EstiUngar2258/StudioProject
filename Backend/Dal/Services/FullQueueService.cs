using Dal.Api;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Dal.Services
{
    public class FullQueueService : IFullQueue
    {
        private readonly DatabaseManager _databaseManager;

        public FullQueueService(DatabaseManager db)
        {
            _databaseManager = db;
        }

        public void Add(FullQueue entity)
        {
            if (entity == null)
            {
                Console.WriteLine("Item is empty");
                return;
            }
            _databaseManager.FullQueues.Add(entity);
            _databaseManager.SaveChanges();
        }
       

        public void Delete(int id)
        {
            var entity = _databaseManager.FullQueues.FirstOrDefault(e => e.Id == id)
                ?? throw new KeyNotFoundException($"Entity with ID {id} not found.");
            _databaseManager.FullQueues.Remove(entity);
            _databaseManager.SaveChanges();
        }

        public IEnumerable<FullQueue> GetAll()
        {
            return _databaseManager.FullQueues;
        }

        public FullQueue GetById(int id)
        {
            var entity = _databaseManager.FullQueues.FirstOrDefault(e => e.Id == id);
            return entity
                ?? throw new KeyNotFoundException($"Entity with ID {id} not found.");
        }

        public void Update(FullQueue entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity), "The entity cannot be null.");
            }

            var entityOld = _databaseManager.FullQueues.Find(entity.Id)
                ?? throw new KeyNotFoundException($"FullQueue with ID {entity.Id} not found.");
           

            // עדכון המאפיינים
            entityOld.WorkerId = entity.WorkerId;
            entityOld.DateTime = entity.DateTime;
            entityOld.Hour = entity.Hour;
            entityOld.ClientId = entity.ClientId;
            entityOld.ServiceId = entity.ServiceId;
            entityOld.Status = entity.Status;

            _databaseManager.SaveChanges();
        }




        public FullQueue GetQueueByDate(DateOnly dateOnly, TimeOnly timeOnly)
        {
            var existingEntity = _databaseManager.FullQueues.FirstOrDefault(e => e.DateTime == dateOnly && e.Hour == timeOnly)
               ?? throw new KeyNotFoundException($"FreeQueue with DateTime {dateOnly} or Hour {timeOnly} not found.");
            return existingEntity;
        }

        public List<FullQueue> GetQueueByDate(DateOnly dateOnly)
        {
            var existingEntity = _databaseManager.FullQueues.Where(e => e.DateTime == dateOnly).ToList()
                ?? throw new KeyNotFoundException($"FreeQueue with DateTime {dateOnly}  not found.");
            return existingEntity;
        }
        public IEnumerable<FullQueue> GetByDate(DateOnly date)
        {
            if (date == default) throw new ArgumentException("Date must be a valid date.", nameof(date));

            return _databaseManager.FullQueues
                .Where(fullQueue => fullQueue.DateTime == date)
                .ToList();

        }
    }
}
