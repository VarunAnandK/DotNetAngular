using Alpha.Database.Tables;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alpha.Database.Mapping
{
    public class user_map : AlphaEntityTypeConfiguration<user>
    {
        public override void Configure(EntityTypeBuilder<user> entityBuilder)
        {
            entityBuilder.ToTable(nameof(user));
            entityBuilder.HasKey(t => t.id);
            entityBuilder.Property(t => t.user_name).IsRequired();
            entityBuilder.HasIndex(e => e.user_name).IsUnique();
            entityBuilder.Property(t => t.password).IsRequired();
            entityBuilder.Property(t => t.email).IsRequired();
            entityBuilder.HasIndex(e => e.email).IsUnique();
            entityBuilder.HasOne(o=>o.user_role).WithMany(o=>o.user_list).HasForeignKey(o=>o.user_role_id).OnDelete(DeleteBehavior.Restrict);
            entityBuilder.HasData(new user() { id = 1, user_name = "sadmin", password = "123", email = "sadmin@gmail.com", user_role_id = 1, status = true });
            base.Configure(entityBuilder);
        }
    }
}
