using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class Client
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int Phone { get; set; }

    public int? Age { get; set; }

    public string? Email { get; set; }

    public virtual ICollection<FullQueue> FullQueues { get; set; } = new List<FullQueue>();
}
