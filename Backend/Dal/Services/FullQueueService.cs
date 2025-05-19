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
            var entity = _databaseManager.FullQueues.FirstOrDefault(e => e.Id == id);
            if (entity == null)
            {
                Console.WriteLine("The queue not found");
                return;
            }

            _databaseManager.FullQueues.Remove(entity);
            _databaseManager.SaveChanges();
        }

        public IEnumerable<FullQueue> GetAll()
        {
            return _databaseManager.FullQueues.ToList();
        }

        public FullQueue GetById(int id)
        {
            var entity = _databaseManager.FullQueues.FirstOrDefault(e => e.Id == id);
            if (entity == null)
            {
                Console.WriteLine("The queue not found");
                return null;
            }

            return entity;
        }

        public void Update(FullQueue entity)
        {
            var entityOld = _databaseManager.FullQueues.Find(entity.Id);
            if (entityOld == null)
            {
                Console.WriteLine("The queue not found");
                throw new KeyNotFoundException("The queue not found");
            }

            // עדכון המאפיינים
            entityOld.WorkerId = entity.WorkerId;
            entityOld.DateTime = entity.DateTime;
            entityOld.Hour = entity.Hour;
            entityOld.ClientId = entity.ClientId;
            entityOld.ServiceId = entity.ServiceId;
            entityOld.Status = entity.Status;

            _databaseManager.SaveChanges();
        }
    }
}

