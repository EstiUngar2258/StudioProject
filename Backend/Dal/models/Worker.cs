using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class Worker
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

    public virtual ICollection<FreeQueue> FreeQueues { get; set; } = new List<FreeQueue>();

    public virtual ICollection<FullQueue> FullQueues { get; set; } = new List<FullQueue>();
}
