using Dal.Api;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class StudioServiceService : IStudioService
    {
        private readonly DatabaseManager _databaseManager;

        public StudioServiceService(DatabaseManager db)
        {
            _databaseManager = db;
        }
        public void Add(StudioService entity)
        {
            if (entity == null)
            {
                Console.WriteLine("item is empty");
                return;
            }
            _databaseManager.StudioServices.Add(entity);
            _databaseManager.SaveChanges();
        }

        public void Delete(int id)
        {
            var entity = _databaseManager.StudioServices.FirstOrDefault(e => e.Id == id) ??
                throw new KeyNotFoundException($"Entity with ID {id} not found.");
            _databaseManager.StudioServices.Remove(entity);
            _databaseManager.SaveChanges();
        }

        public IEnumerable<StudioService> GetAll()
        {
            return _databaseManager.StudioServices;
        }

        public StudioService GetById(int id)
        {
            var entity = _databaseManager.StudioServices.FirstOrDefault(e => e.Id == id) ??
               throw new KeyNotFoundException($"Entity with ID {id} not found.");
            return entity;
        }

            public void Update(StudioService entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity), "The entity cannot be null.");
            }

            var existingEntity = _databaseManager.StudioServices.FirstOrDefault(e => e.Id == entity.Id)
                ?? throw new KeyNotFoundException($"service with ID {entity.Id} not found.");
            existingEntity.Id = entity.Id;
            existingEntity.Price = entity.Price;
            existingEntity.ServiceName = entity.ServiceName;
            existingEntity.Description = entity.Description;
            existingEntity.Duration = entity.Duration;

            _databaseManager.SaveChanges();
        }

      
    }
}
