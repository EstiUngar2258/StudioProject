using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class StudioService
{
    public int Id { get; set; }

    public string ServiceName { get; set; } = null!;

    public double Duration { get; set; }

    public double Price { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<FullQueue> FullQueues { get; set; } = new List<FullQueue>();
}
