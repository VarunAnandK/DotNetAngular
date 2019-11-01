using Alpha.Database.Tables;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alpha.Database.Mapping
{
    public class UserMap : AlphaEntityTypeConfiguration<User>
    {
        public override void Configure(EntityTypeBuilder<User> entityBuilder)
        {
            entityBuilder.ToTable(nameof(User));
            entityBuilder.HasKey(t => t.Id);
            entityBuilder.Property(t => t.UserName).IsRequired();
            entityBuilder.Property(t => t.Password).IsRequired();
            entityBuilder.Property(t => t.Email).IsRequired();
            entityBuilder.HasData(new User() { Id = 1, UserName = "sadmin", Password = "123", Email = "sadmin@gmail.com", Status = true });
            base.Configure(entityBuilder);
        }
    }
}
