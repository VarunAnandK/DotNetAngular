using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Alpha.Migrations
{
    public partial class s1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "user_role",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    status = table.Column<bool>(nullable: false),
                    created_by_id = table.Column<long>(nullable: false),
                    created_on = table.Column<DateTime>(nullable: false),
                    updated_by_id = table.Column<long>(nullable: true),
                    updated_on = table.Column<DateTime>(nullable: true),
                    name = table.Column<string>(nullable: false),
                    landing_page = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_role", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    status = table.Column<bool>(nullable: false),
                    created_by_id = table.Column<long>(nullable: false),
                    created_on = table.Column<DateTime>(nullable: false),
                    updated_by_id = table.Column<long>(nullable: true),
                    updated_on = table.Column<DateTime>(nullable: true),
                    user_name = table.Column<string>(nullable: false),
                    password = table.Column<string>(nullable: false),
                    email = table.Column<string>(nullable: false),
                    token = table.Column<string>(nullable: true),
                    user_role_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.id);
                    table.ForeignKey(
                        name: "FK_user_user_role_user_role_id",
                        column: x => x.user_role_id,
                        principalTable: "user_role",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "user_role",
                columns: new[] { "id", "created_by_id", "created_on", "landing_page", "name", "status", "updated_by_id", "updated_on" },
                values: new object[] { 1L, 0L, new DateTime(2019, 11, 4, 19, 35, 10, 486, DateTimeKind.Local).AddTicks(2692), "/Admin/Dashboard", "Super Admin", true, null, null });

            migrationBuilder.InsertData(
                table: "user",
                columns: new[] { "id", "created_by_id", "created_on", "email", "password", "status", "token", "updated_by_id", "updated_on", "user_name", "user_role_id" },
                values: new object[] { 1L, 0L, new DateTime(2019, 11, 4, 19, 35, 10, 463, DateTimeKind.Local).AddTicks(2806), "sadmin@gmail.com", "123", true, null, null, null, "sadmin", 1L });

            migrationBuilder.CreateIndex(
                name: "IX_user_user_role_id",
                table: "user",
                column: "user_role_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "user");

            migrationBuilder.DropTable(
                name: "user_role");
        }
    }
}
