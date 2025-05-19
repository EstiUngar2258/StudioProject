using Dal.Api;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class WorkerService:IWorker
    {
        private readonly DatabaseManager _databaseManager;
        public WorkerService(DatabaseManager db)
        {
            _databaseManager = db;
        }
        public void Add(Worker entity)
        {
            if (entity == null)
            {
                Console.WriteLine("item is empty");
                return;
            }
            _databaseManager.Workers.Add(entity);
            _databaseManager.SaveChanges();

        }

        public void Delete(int id)
        {
            var entity = _databaseManager.Workers.FirstOrDefault(e => e.Id == id);
            if (entity == null)
            {
                Console.WriteLine("The user not find");
                return;
            }

            _databaseManager.Workers.Remove(entity);
            _databaseManager.SaveChanges();


        }


        public IEnumerable<Worker> GetAll()
        {
            return _databaseManager.Workers;
        }

        public Worker GetById(int id)
        {
            var entity = _databaseManager.Workers.FirstOrDefault(e => e.Id == id);
            if (entity == null)
            {
                Console.WriteLine("The user not find");
                return null;
            }

            return entity;
        }

        public void Update(Worker entity)
        {
            var entityOld = _databaseManager.Workers.Find(entity.Id);
            if (entityOld == null)
            {
                Console.WriteLine("The worker not found");
                throw new KeyNotFoundException("The worker not found");
            }

            // עדכון המאפיינים
            entityOld.Email = entity.Email;
            entityOld.FirstName = entity.FirstName;
            entityOld.LastName = entity.LastName;
            entityOld.Age = entity.Age;
            entityOld.Phone = entity.Phone;
            entityOld.FullQueues = entity.FullQueues; 
            entityOld.FreeQueues=entity.FreeQueues;
            entityOld.SalaryForHour = entity.SalaryForHour;
            entityOld.Bonus = entity.Bonus;
            entityOld.Seniority = entity.Seniority;
            entityOld.WorkerType = entity.WorkerType;

            _databaseManager.SaveChanges();
        }
    }
}
