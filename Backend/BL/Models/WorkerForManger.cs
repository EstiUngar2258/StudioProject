using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public class WorkerForManger
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public int Phone { get; set; }

        public string WorkerType { get; set; } = null!;

        public int? Age { get; set; }

        public decimal SalaryForHour { get; set; }

        public int Seniority { get; set; }

        public double? Bonus { get; set; }

        public string Email { get; set; } = null!;

  
    }


}




