using Dal.Api;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class ClientService : IClient
    {
        private readonly DatabaseManager _databaseManager;
        public ClientService(DatabaseManager db)
        {
            _databaseManager = db;
        }
        public void Add(Client entity)
        {
            if (entity == null)
            {
                Console.WriteLine("item is empty");
                return;
            }
            _databaseManager.Clients.Add(entity);
            _databaseManager.SaveChanges();

        }

        public void Delete(int id)
        {
            var entity = _databaseManager.Clients.FirstOrDefault(e => e.Id == id);
            if (entity == null)
            {
               

                throw new KeyNotFoundException($"Entity with ID {id} not found.");

            }

            _databaseManager.Clients.Remove(entity);
            _databaseManager.SaveChanges();


        }


        public IEnumerable<Client> GetAll()
        {
            return _databaseManager.Clients;
        }

        public Client GetById(int id)
        {
            var entity = _databaseManager.Clients.FirstOrDefault(e => e.Id == id);
            if (entity == null)
            {
               

                throw new KeyNotFoundException($"Entity with ID {id} not found.");

            }

            return entity;
        }

        public void Update(Client entity)
        {

            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity), "The entity cannot be null.");
            }

            var entityOld = _databaseManager.Clients.FirstOrDefault(e => e.Id == entity.Id)
                ?? throw new KeyNotFoundException($"Client with ID {entity.Id} not found.");


            // עדכון המאפיינים
            entityOld.Email = entity.Email;
            entityOld.FirstName = entity.FirstName;
            entityOld.LastName = entity.LastName;
            entityOld.Age = entity.Age;
            entityOld.Phone= entity.Phone;
            entityOld.FullQueues = entity.FullQueues; // אם צריך עיון, ודא שזה מה שאתה רוצה
            
            _databaseManager.SaveChanges();
        }
    }
    }