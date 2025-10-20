using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PerBrain.Migrations
{
    /// <inheritdoc />
    public partial class Created_Department_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    DepartmentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.DepartmentId);
                });

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7277));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7279));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7280));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7282));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7284));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 6,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7285));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 7,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7287));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 8,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7320));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 9,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7321));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 1,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7488));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 2,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7489));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 3,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7491));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 4,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7492));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 5,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7494));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 6,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7495));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 7,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7496));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 8,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7497));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 9,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7499));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 10,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7500));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 11,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7501));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 12,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7502));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 13,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7504));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 14,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7505));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 15,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7506));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 16,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7507));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 17,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7508));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 18,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7510));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 19,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7511));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 20,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7512));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 21,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7513));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 22,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7514));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 23,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7516));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 24,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7517));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 25,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7518));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 26,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7519));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 27,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7521));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7461));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7463));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7464));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7466));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 20, 11, 12, 18, 867, DateTimeKind.Utc).AddTicks(7467));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(4862));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(4863));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(4865));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(4866));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(4867));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 6,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(4869));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 7,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(4870));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 8,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(4871));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 9,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(4873));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 1,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5078));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 2,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5079));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 3,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5080));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 4,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5081));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 5,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5082));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 6,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5083));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 7,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5084));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 8,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5085));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 9,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5086));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 10,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5088));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 11,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5089));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 12,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5090));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 13,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5091));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 14,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5092));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 15,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5093));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 16,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5094));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 17,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5095));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 18,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5096));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 19,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5097));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 20,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5098));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 21,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5099));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 22,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5100));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 23,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5101));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 24,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5102));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 25,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5103));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 26,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5104));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 27,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5106));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5003));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5007));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5009));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5010));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 31, 51, 118, DateTimeKind.Utc).AddTicks(5057));
        }
    }
}
