using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Alpha.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "column",
                table: "audit_trail");

            migrationBuilder.DropColumn(
                name: "primary_key",
                table: "audit_trail");

            migrationBuilder.AlterColumn<string>(
                name: "user_name",
                table: "user",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "user",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "key_values",
                table: "audit_trail",
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

            migrationBuilder.CreateIndex(
                name: "IX_user_email",
                table: "user",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_user_user_name",
                table: "user",
                column: "user_name",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_user_email",
                table: "user");

            migrationBuilder.DropIndex(
                name: "IX_user_user_name",
                table: "user");

            migrationBuilder.DropColumn(
                name: "key_values",
                table: "audit_trail");

            migrationBuilder.AlterColumn<string>(
                name: "user_name",
                table: "user",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "user",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string));

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
