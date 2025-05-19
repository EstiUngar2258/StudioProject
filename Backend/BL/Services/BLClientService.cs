using BL.Api;
using BL.Models;
using Dal.Api;
using Dal.models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class BLClientService : IBLClient
    {
        IClient _client;
        public BLClientService(IDal dal)
        {
            _client = dal.Client;

        }

        public bool ClientOK(Client client) {
            // בדוק אם FirstName ו-LastName לא ריקים
            if (string.IsNullOrWhiteSpace(client.FirstName))
            {
                throw new ArgumentException("First name is required.", nameof(client.FirstName));
            }

            if (string.IsNullOrWhiteSpace(client.LastName))
            {
                throw new ArgumentException("Last name is required.", nameof(client.LastName));
            }

            // בדוק אם Phone הוא מספר תקין (10 ספרות)
            //if (client.Phone < 1000000000 || client.Phone > 999999)
            //{
            //    throw new ArgumentException("Phone number must be a valid 10-digit number.", nameof(client.Phone));
            //}

            // בדוק אם Age בטווח תקין
            if (client.Age.HasValue && (client.Age < 0 || client.Age > 120))
            {
                throw new ArgumentException("Age must be between 0 and 120.", nameof(client.Age));
            }

            // בדוק אם Email בפורמט תקין
            if (!string.IsNullOrWhiteSpace(client.Email) && !new EmailAddressAttribute().IsValid(client.Email))
            {
                throw new ArgumentException("Invalid email address.", nameof(client.Email));
            }
            return true;
        }

        public void Add(Client client)
        {
          if (ClientOK( client))

            _client.Add(client);
        }

        public IEnumerable<ClientForManager> GetAllForManager()
        {
            List<ClientForManager> clientList = new List<ClientForManager>();
            _client.GetAll().ToList()
                .ForEach(client => clientList.Add(new ClientForManager()
                { FirstName = client.FirstName, Age = client.Age, Email = client.Email, Id = client.Id, LastName = client.LastName, Phone = client.Phone }));
            return clientList;
        }

        public ClientForManager GetByIdForManager(int id)
        {
            //if (id < 100000000 || id > 999999999)
            //{
            //    throw new ArgumentException("Id number must be a valid 10-digit number.", nameof(id)); // לא תקין
            //}
            Client c= _client.GetById(id);
            ClientForManager clientForManager = new ClientForManager() {
                Id=c.Id,
                FirstName=c.FirstName,
                LastName=c.LastName,
                Phone=c.Phone,
                Age=c.Age,
                Email=c.Email,
            };
            return clientForManager;


        }
        public void Update(Client entity)
        {
            if (ClientOK(entity))
                _client.Update(entity);
        }

    }
}
