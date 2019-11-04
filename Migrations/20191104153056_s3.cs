using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Alpha.Migrations
{
    public partial class s3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "action",
                table: "audit_trail",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "primary_key",
                table: "audit_trail",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "user_id",
                table: "audit_trail",
                nullable: false,
                defaultValue: 0L);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "action",
                table: "audit_trail");

            migrationBuilder.DropColumn(
                name: "primary_key",
                table: "audit_trail");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "audit_trail");

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
    }
}
