using BL.Models;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLClient
    {
        public IEnumerable<ClientForManager> GetAllForManager();
        public void Add(Client client);
        public ClientForManager GetByIdForManager(int id);
        public void Update(Client entity);

    }
}
