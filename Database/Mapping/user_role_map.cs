using Alpha.Database.Tables;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alpha.Database.Mapping
{
    public class user_role_map : AlphaEntityTypeConfiguration<user_role>
    {
        public override void Configure(EntityTypeBuilder<user_role> entityBuilder)
        {
            entityBuilder.ToTable(nameof(user_role));
            entityBuilder.HasKey(t => t.id);
            entityBuilder.Property(t => t.name).IsRequired();
            entityBuilder.HasData(new user_role() { id = 1, name = "Super Admin", landing_page = "/Admin/Dashboard", status = true });
            base.Configure(entityBuilder);
        }
    }
}
