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
                Console.WriteLine("The user not find");
                return;
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
                Console.WriteLine("The user not find");
                return null;
            }

            return entity;
        }

        public void Update(Client entity)
        {
            var entityOld = _databaseManager.Clients.Find(entity.Id);
            if (entityOld == null) 
            {
                Console.WriteLine("The user not found");
                throw new KeyNotFoundException("The user not found");
            }

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