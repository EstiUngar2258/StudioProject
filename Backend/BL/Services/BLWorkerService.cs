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
    public class BLWorkerService : IBLWorker
    {
        private readonly IWorker _bLWorker;


        public BLWorkerService(IDal dal)
        {
            _bLWorker = dal.Worker;
          
        }
        private void ValidateWorkerForManager(WorkerForManger entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity), "Worker entity cannot be null.");

            if (string.IsNullOrWhiteSpace(entity.FirstName))
                throw new ArgumentException("First name is required.", nameof(entity.FirstName));

            if (string.IsNullOrWhiteSpace(entity.LastName))
                throw new ArgumentException("Last name is required.", nameof(entity.LastName));

            if (string.IsNullOrWhiteSpace(entity.Email))
                throw new ArgumentException("Email is required.", nameof(entity.Email));

            if (string.IsNullOrWhiteSpace(entity.WorkerType))
                throw new ArgumentException("Worker type is required.", nameof(entity.WorkerType));

            if (entity.Age.HasValue && (entity.Age < 16 || entity.Age > 120))
                throw new ArgumentOutOfRangeException(nameof(entity.Age), "Age must be between 16 and 120.");

            if (entity.SalaryForHour < 0)
                throw new ArgumentOutOfRangeException(nameof(entity.SalaryForHour), "Salary per hour must be non-negative.");

            if (entity.Seniority < 0)
                throw new ArgumentOutOfRangeException(nameof(entity.Seniority), "Seniority must be non-negative.");

            if (entity.Bonus.HasValue && entity.Bonus < 0)
                throw new ArgumentOutOfRangeException(nameof(entity.Bonus), "Bonus must be non-negative.");

            if (entity.Phone <= 0)
                throw new ArgumentException("Phone must be a positive integer.", nameof(entity.Phone));
        }

        public void Add(WorkerForManger entity)
        {
            ValidateWorkerForManager(entity);
            _bLWorker.Add(new Worker
            {
                Id = entity.Id,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Age = entity.Age,
                Bonus = entity.Bonus,
                WorkerType = entity.WorkerType,
                Email = entity.Email,
                Phone = entity.Phone,
                SalaryForHour = entity.SalaryForHour,
                Seniority = entity.Seniority,
            });
        }

        public void Delete(int id)
        {
            if (id <= 0)
                throw new ArgumentException("ID must be a positive integer.", nameof(id));
            var worker = _bLWorker.GetById(id);
            if (worker == null)
                throw new KeyNotFoundException($"Worker with ID {id} not found.");
            _bLWorker.Delete(id);
        }

        public IEnumerable<WorkerForManger> GetAll()
        {
            var workers = _bLWorker.GetAll();
            return workers.Select(w => new WorkerForManger
            {
                Id = w.Id,
                FirstName = w.FirstName,
                LastName = w.LastName,
                Age = w.Age,
                Bonus = w.Bonus,
                WorkerType = w.WorkerType,
                Email = w.Email,
                Phone = w.Phone,
                SalaryForHour = w.SalaryForHour,
                Seniority = w.Seniority
            });

        }

        public WorkerForManger GetById(int id)
        {
            if (id <= 0)
                throw new ArgumentException("ID must be a positive integer.", nameof(id));
            var worker = _bLWorker.GetById(id);
            if (worker == null)
                throw new KeyNotFoundException($"Worker with ID {id} not found.");
            return new WorkerForManger
            {
                Id = worker.Id,
                FirstName = worker.FirstName,
                LastName = worker.LastName,
                Age = worker.Age,
                Bonus = worker.Bonus,
                WorkerType = worker.WorkerType,
                Email = worker.Email,
                Phone = worker.Phone,
                SalaryForHour = worker.SalaryForHour,
                Seniority = worker.Seniority
            };

        }

        public void Update(WorkerForManger entity)
        {
            ValidateWorkerForManager(entity);
            var existingWorker = _bLWorker.GetById(entity.Id);
            if (existingWorker == null)
                throw new KeyNotFoundException($"Worker with ID {entity.Id} not found.");
            existingWorker.FirstName = entity.FirstName;
            existingWorker.LastName = entity.LastName;
            existingWorker.Age = entity.Age;
            existingWorker.Bonus = entity.Bonus;
            existingWorker.WorkerType = entity.WorkerType;
            existingWorker.Email = entity.Email;
            existingWorker.Phone = entity.Phone;
            existingWorker.SalaryForHour = entity.SalaryForHour;
            existingWorker.Seniority = entity.Seniority;
            _bLWorker.Update(existingWorker);

        }
    }
}
