using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class FreeQueue
{
    public int Id { get; set; }

    public int WorkerId { get; set; }

    public DateOnly DateTime { get; set; }

    public TimeOnly Hour { get; set; }

    public virtual Worker Worker { get; set; } = null!;
}
