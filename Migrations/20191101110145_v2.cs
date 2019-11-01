using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Alpha.Migrations
{
    public partial class v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "User",
                nullable: true);

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "CompanyId", "CreatedBy", "CreatedDate", "Email", "Password", "Status", "Token", "UpdatedBy", "UpdatedDate", "UserName" },
                values: new object[] { 1L, 0L, 0L, new DateTime(2019, 11, 1, 16, 46, 45, 622, DateTimeKind.Local).AddTicks(5368), "sadmin@gmail.com", "123", true, null, null, null, "sadmin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DropColumn(
                name: "Token",
                table: "User");
        }
    }
}
