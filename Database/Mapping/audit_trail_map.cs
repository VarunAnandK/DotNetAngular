using Alpha.Database.Tables;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Alpha.Database.Mapping
{
    public class audit_trail_map : AlphaEntityTypeConfiguration<audit_trail>
    {
        public override void Configure(EntityTypeBuilder<audit_trail> entityBuilder)
        {
            entityBuilder.ToTable(nameof(audit_trail));
            entityBuilder.HasKey(t => t.id);
            base.Configure(entityBuilder);
        }
    }
}
