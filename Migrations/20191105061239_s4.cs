using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Alpha.Migrations
{
    public partial class s4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "column",
                table: "audit_trail");

            migrationBuilder.DropColumn(
                name: "primary_key",
                table: "audit_trail");

            migrationBuilder.AddColumn<string>(
                name: "key_values",
                table: "audit_trail",
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "key_values",
                table: "audit_trail");

            migrationBuilder.AddColumn<string>(
                name: "column",
                table: "audit_trail",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "primary_key",
                table: "audit_trail",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "id",
                keyValue: 1L,
                column: "created_on",
                value: new DateTime(2019, 11, 4, 21, 15, 55, 758, DateTimeKind.Local).AddTicks(2164));

            migrationBuilder.UpdateData(
                table: "user_role",
                keyColumn: "id",
                keyValue: 1L,
                column: "created_on",
                value: new DateTime(2019, 11, 4, 21, 15, 55, 782, DateTimeKind.Local).AddTicks(9181));
        }
    }
}
