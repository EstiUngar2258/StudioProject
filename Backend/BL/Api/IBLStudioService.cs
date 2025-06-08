using BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLStudioService
    {
        public IEnumerable<StudioServiceToGet> GetAll();
        public void Add(AddService Service);
        public StudioServiceToGet GetById(int id);
        public void Update(StudioServiceToGet entity);
        public void Delete(StudioServiceToGet entity);

    }
}
