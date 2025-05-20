using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public class FreeQueueForClient
    {
        public int Id { get; set; }

        public DateOnly DateTime { get; set; }

        public TimeOnly Hour { get; set; }
    }
}
