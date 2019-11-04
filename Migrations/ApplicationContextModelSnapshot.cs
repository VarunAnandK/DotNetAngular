﻿// <auto-generated />
using System;
using Alpha.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Alpha.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Alpha.Database.Tables.audit_trail", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("action")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("column")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("created_by_id")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("created_on")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("date")
                        .HasColumnType("datetime2");

                    b.Property<string>("new_value")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("old_value")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("primary_key")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("status")
                        .HasColumnType("bit");

                    b.Property<string>("table")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("updated_by_id")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("updated_on")
                        .HasColumnType("datetime2");

                    b.Property<long>("user_id")
                        .HasColumnType("bigint");

                    b.HasKey("id");

                    b.ToTable("audit_trail");
                });

            modelBuilder.Entity("Alpha.Database.Tables.user", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("created_by_id")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("created_on")
                        .HasColumnType("datetime2");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("status")
                        .HasColumnType("bit");

                    b.Property<string>("token")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("updated_by_id")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("updated_on")
                        .HasColumnType("datetime2");

                    b.Property<string>("user_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("user_role_id")
                        .HasColumnType("bigint");

                    b.HasKey("id");

                    b.HasIndex("user_role_id");

                    b.ToTable("user");

                    b.HasData(
                        new
                        {
                            id = 1L,
                            created_by_id = 0L,
                            created_on = new DateTime(2019, 11, 4, 21, 15, 55, 758, DateTimeKind.Local).AddTicks(2164),
                            email = "sadmin@gmail.com",
                            password = "123",
                            status = true,
                            user_name = "sadmin",
                            user_role_id = 1L
                        });
                });

            modelBuilder.Entity("Alpha.Database.Tables.user_role", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("created_by_id")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("created_on")
                        .HasColumnType("datetime2");

                    b.Property<string>("landing_page")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("status")
                        .HasColumnType("bit");

                    b.Property<long?>("updated_by_id")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("updated_on")
                        .HasColumnType("datetime2");

                    b.HasKey("id");

                    b.ToTable("user_role");

                    b.HasData(
                        new
                        {
                            id = 1L,
                            created_by_id = 0L,
                            created_on = new DateTime(2019, 11, 4, 21, 15, 55, 782, DateTimeKind.Local).AddTicks(9181),
                            landing_page = "/Admin/Dashboard",
                            name = "Super Admin",
                            status = true
                        });
                });

            modelBuilder.Entity("Alpha.Database.Tables.user", b =>
                {
                    b.HasOne("Alpha.Database.Tables.user_role", "user_role")
                        .WithMany("user_list")
                        .HasForeignKey("user_role_id")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
