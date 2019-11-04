using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Alpha.Migrations
{
    public partial class s2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "audit_trail",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    status = table.Column<bool>(nullable: false),
                    created_by_id = table.Column<long>(nullable: false),
                    created_on = table.Column<DateTime>(nullable: false),
                    updated_by_id = table.Column<long>(nullable: true),
                    updated_on = table.Column<DateTime>(nullable: true),
                    table = table.Column<string>(nullable: true),
                    column = table.Column<string>(nullable: true),
                    old_value = table.Column<string>(nullable: true),
                    new_value = table.Column<string>(nullable: true),
                    date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_audit_trail", x => x.id);
                });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "id",
                keyValue: 1L,
                column: "created_on",
                value: new DateTime(2019, 11, 4, 20, 45, 36, 736, DateTimeKind.Local).AddTicks(4383));

            migrationBuilder.UpdateData(
                table: "user_role",
                keyColumn: "id",
                keyValue: 1L,
                column: "created_on",
                value: new DateTime(2019, 11, 4, 20, 45, 36, 758, DateTimeKind.Local).AddTicks(3466));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "audit_trail");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "id",
                keyValue: 1L,
                column: "created_on",
                value: new DateTime(2019, 11, 4, 19, 35, 10, 463, DateTimeKind.Local).AddTicks(2806));

            migrationBuilder.UpdateData(
                table: "user_role",
                keyColumn: "id",
                keyValue: 1L,
                column: "created_on",
                value: new DateTime(2019, 11, 4, 19, 35, 10, 486, DateTimeKind.Local).AddTicks(2692));
        }
    }
}
