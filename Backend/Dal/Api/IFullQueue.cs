using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IFullQueue:ICrud<FullQueue>
    {

        public FullQueue GetQueueByDate(DateOnly dateOnly, TimeOnly timeOnly);
        public List<FullQueue> GetQueueByDate(DateOnly dateOnly);

    }
}
