using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PerBrain.Migrations
{
    /// <inheritdoc />
    public partial class ChangeHireDateToJoiningDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Salary",
                table: "UserProfiles");

            migrationBuilder.RenameColumn(
                name: "HireDate",
                table: "UserProfiles",
                newName: "JoiningDate");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "JoiningDate",
                table: "UserProfiles",
                newName: "HireDate");

            migrationBuilder.AddColumn<decimal>(
                name: "Salary",
                table: "UserProfiles",
                type: "decimal(10,2)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8452));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8454));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8455));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8457));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8458));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 6,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8459));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 7,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8461));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 8,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8462));

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 9,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8463));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 1,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8615));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 2,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8616));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 3,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8617));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 4,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8618));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 5,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8619));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 6,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8620));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 7,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8621));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 8,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8622));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 9,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8624));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 10,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8625));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 11,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8667));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 12,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8668));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 13,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8669));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 14,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8670));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 15,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8671));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 16,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8672));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 17,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8673));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 18,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8675));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 19,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8676));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 20,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8677));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 21,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8677));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 22,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8678));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 23,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8680));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 24,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8680));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 25,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8681));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 26,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8682));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "RolePermissionId",
                keyValue: 27,
                column: "AssignedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8683));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8591));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8592));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8594));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8595));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8596));
        }
    }
}
