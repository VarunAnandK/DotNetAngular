using Alpha.Database.Tables;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alpha.Database.Mapping
{
    public class country_map : AlphaEntityTypeConfiguration<country>
    {
        public override void Configure(EntityTypeBuilder<country> entityBuilder)
        {
            entityBuilder.ToTable(nameof(country));
            entityBuilder.HasKey(t => t.id);
            entityBuilder.Property(t => t.name).IsRequired();
            entityBuilder.Property(t => t.code).IsRequired();
            entityBuilder.HasData(new country() { id = 1, name = "India", code = "IN", status = true });
            base.Configure(entityBuilder);
        }
    }
}
