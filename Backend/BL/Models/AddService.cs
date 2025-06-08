using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public class AddService
    {
        public string ServiceName { get; set; } = null!;

        public double Duration { get; set; }

        public double Price { get; set; }

        public string? Description { get; set; }
    }
}
