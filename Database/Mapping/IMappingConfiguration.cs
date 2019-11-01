using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alpha.Database.Mapping
{
    public partial interface IMappingConfiguration
    {
        void ApplyConfiguration(ModelBuilder modelBuilder);
    }
}
