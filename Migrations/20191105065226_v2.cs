using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Alpha.Migrations
{
    public partial class v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "key_values",
                table: "audit_trail");

            migrationBuilder.AddColumn<string>(
                name: "column_name",
                table: "audit_trail",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "id",
                keyValue: 1L,
                column: "created_on",
                value: new DateTime(2019, 11, 5, 12, 37, 26, 112, DateTimeKind.Local).AddTicks(8764));

            migrationBuilder.UpdateData(
                table: "user_role",
                keyColumn: "id",
                keyValue: 1L,
                column: "created_on",
                value: new DateTime(2019, 11, 5, 12, 37, 26, 134, DateTimeKind.Local).AddTicks(8543));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "column_name",
                table: "audit_trail");

            migrationBuilder.AddColumn<string>(
                name: "key_values",
                table: "audit_trail",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "id",
                keyValue: 1L,
                column: "created_on",
                value: new DateTime(2019, 11, 5, 11, 17, 36, 876, DateTimeKind.Local).AddTicks(1018));

            migrationBuilder.UpdateData(
                table: "user_role",
                keyColumn: "id",
                keyValue: 1L,
                column: "created_on",
                value: new DateTime(2019, 11, 5, 11, 17, 36, 921, DateTimeKind.Local).AddTicks(5399));
        }
    }
}
