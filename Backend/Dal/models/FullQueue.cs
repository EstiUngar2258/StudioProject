using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class FullQueue
{
    public int Id { get; set; }

    public int WorkerId { get; set; }

    public DateOnly DateTime { get; set; }

    public TimeOnly Hour { get; set; }

    public int ClientId { get; set; }

    public int ServiceId { get; set; }

    public string Status { get; set; } = null!;

    public virtual Client Client { get; set; } = null!;

    public virtual StudioService Service { get; set; } = null!;

    public virtual Worker Worker { get; set; } = null!;
}
