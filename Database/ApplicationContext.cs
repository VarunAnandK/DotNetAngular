using Alpha.Database.Mapping;
using Alpha.Database.Tables;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Alpha.Database
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var typeConfigurations = Assembly.GetExecutingAssembly().GetTypes().Where(type =>
               (type.BaseType?.IsGenericType ?? false)
                   && (type.BaseType.GetGenericTypeDefinition() == typeof(AlphaEntityTypeConfiguration<>)
                       || type.BaseType.GetGenericTypeDefinition() == typeof(AlphaEntityTypeConfiguration<>)));

            foreach (var typeConfiguration in typeConfigurations)
            {
                var configuration = (IMappingConfiguration)Activator.CreateInstance(typeConfiguration);
                configuration.ApplyConfiguration(modelBuilder);
            }
            base.OnModelCreating(modelBuilder);
        }
        public override int SaveChanges()
        {
            return base.SaveChanges();
        }

    }
}
