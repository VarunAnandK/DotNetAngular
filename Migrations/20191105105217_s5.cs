using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Alpha.Migrations
{
    public partial class s5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "country",
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
                    code = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_country", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "country",
                columns: new[] { "id", "code", "created_by_id", "created_on", "name", "status", "updated_by_id", "updated_on" },
                values: new object[] { 1L, "IN", 0L, new DateTime(2019, 11, 5, 16, 22, 16, 692, DateTimeKind.Local).AddTicks(2359), "India", true, null, null });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "id",
                keyValue: 1L,
                column: "created_on",
                value: new DateTime(2019, 11, 5, 16, 22, 16, 735, DateTimeKind.Local).AddTicks(1379));

            migrationBuilder.UpdateData(
                table: "user_role",
                keyColumn: "id",
                keyValue: 1L,
                column: "created_on",
                value: new DateTime(2019, 11, 5, 16, 22, 16, 741, DateTimeKind.Local).AddTicks(9241));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "country");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "id",
                keyValue: 1L,
                column: "created_on",
                value: new DateTime(2019, 11, 5, 11, 42, 38, 900, DateTimeKind.Local).AddTicks(5903));

            migrationBuilder.UpdateData(
                table: "user_role",
                keyColumn: "id",
                keyValue: 1L,
                column: "created_on",
                value: new DateTime(2019, 11, 5, 11, 42, 38, 970, DateTimeKind.Local).AddTicks(407));
        }
    }
}
