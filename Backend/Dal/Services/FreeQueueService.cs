using System;

using Dal.Api;

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.models;


namespace Dal.Services

{


    public class FreeQueueService : IFreeQueue
    {
        private readonly DatabaseManager _databaseManager;
        public FreeQueueService(DatabaseManager db)
        {
            _databaseManager = db;
        }
        public void Add(FreeQueue entity)
        {

            if (entity == null)
            {
                Console.WriteLine("item is empty");
                return;
            }
            _databaseManager.FreeQueues.Add(entity);
            _databaseManager.SaveChanges();

        }

        public void Delete(int id)
        {
            var entity = _databaseManager.FreeQueues.FirstOrDefault(e => e.Id == id) ??
                throw new KeyNotFoundException($"Entity with ID {id} not found.");
            _databaseManager.FreeQueues.Remove(entity);
            _databaseManager.SaveChanges();
        }


        public IEnumerable<FreeQueue> GetAll()
        {
            return _databaseManager.FreeQueues;
        }

        public FreeQueue GetById(int id)
        {
            var entity = _databaseManager.FreeQueues.FirstOrDefault(e => e.Id == id) ??
               throw new KeyNotFoundException($"Entity with ID {id} not found.");
            return entity;
        }

        public void Update(FreeQueue entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity), "The entity cannot be null.");
            }

            var existingEntity = _databaseManager.FreeQueues.FirstOrDefault(e => e.Id == entity.Id)
                ?? throw new KeyNotFoundException($"FreeQueue with ID {entity.Id} not found.");
            existingEntity.WorkerId = entity.WorkerId;
            existingEntity.DateTime = entity.DateTime;
            existingEntity.Hour = entity.Hour;
            existingEntity.Worker = entity.Worker;


            _databaseManager.SaveChanges(); 
        }

        public FreeQueue GetQueueByDate(DateOnly dateOnly, TimeOnly timeOnly)
        {
            var existingEntity = _databaseManager.FreeQueues.FirstOrDefault(e => e.DateTime == dateOnly && e.Hour == timeOnly)
               ?? throw new KeyNotFoundException($"FreeQueue with DateTime {dateOnly} or Hour {timeOnly} not found.");
            return existingEntity;
        }

    }
}
