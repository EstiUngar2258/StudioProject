using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public class FullQueueForAdd
    {
        public int Id { get; set; }
        public DateOnly DateTime { get; set; }
        public TimeOnly Hour { get; set; }
        public int ClientId { get; set; }
        public int ServiceId { get; set; }
    }
}
