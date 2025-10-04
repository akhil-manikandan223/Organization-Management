using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PerBrain.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleBasedPermissionSystem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isActive",
                table: "UserProfiles",
                newName: "IsActive");

            migrationBuilder.AddColumn<string>(
                name: "AlternatePhone",
                table: "UserProfiles",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "UserProfiles",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "UserProfiles",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "UserProfiles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Department",
                table: "UserProfiles",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmergencyContact",
                table: "UserProfiles",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmergencyContactPhone",
                table: "UserProfiles",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmployeeId",
                table: "UserProfiles",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "UserProfiles",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "HireDate",
                table: "UserProfiles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "JobTitle",
                table: "UserProfiles",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Manager",
                table: "UserProfiles",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MiddleName",
                table: "UserProfiles",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "UserProfiles",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfilePicture",
                table: "UserProfiles",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Salary",
                table: "UserProfiles",
                type: "decimal(10,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "UserProfiles",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UpdatedBy",
                table: "UserProfiles",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "UserProfiles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    PermissionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PermissionName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PermissionCode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Module = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.PermissionId);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "RolePermissions",
                columns: table => new
                {
                    RolePermissionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    PermissionId = table.Column<int>(type: "int", nullable: false),
                    AssignedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    AssignedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermissions", x => x.RolePermissionId);
                    table.ForeignKey(
                        name: "FK_RolePermissions_Permissions_PermissionId",
                        column: x => x.PermissionId,
                        principalTable: "Permissions",
                        principalColumn: "PermissionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePermissions_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserRoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    AssignedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    AssignedBy = table.Column<int>(type: "int", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => x.UserRoleId);
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_UserProfiles_UserId",
                        column: x => x.UserId,
                        principalTable: "UserProfiles",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Permissions",
                columns: new[] { "PermissionId", "CreatedDate", "Description", "IsActive", "Module", "PermissionCode", "PermissionName" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8452), "Ability to view user list and details", true, "Users", "USERS_VIEW", "View Users" },
                    { 2, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8454), "Ability to create new users", true, "Users", "USERS_CREATE", "Create Users" },
                    { 3, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8455), "Ability to edit existing users", true, "Users", "USERS_EDIT", "Edit Users" },
                    { 4, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8457), "Ability to delete users", true, "Users", "USERS_DELETE", "Delete Users" },
                    { 5, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8458), "Ability to access the main dashboard", true, "Dashboard", "DASHBOARD_VIEW", "View Dashboard" },
                    { 6, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8459), "Ability to view reports", true, "Reports", "REPORTS_VIEW", "View Reports" },
                    { 7, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8461), "Ability to create and manage roles and permissions", true, "Administration", "ROLES_MANAGE", "Manage Roles" },
                    { 8, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8462), "Ability to view teams", true, "Teams", "TEAMS_VIEW", "View Teams" },
                    { 9, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8463), "Ability to view workspaces", true, "Workspaces", "WORKSPACES_VIEW", "View Workspaces" }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "RoleId", "CreatedBy", "CreatedDate", "Description", "IsActive", "RoleName", "UpdatedBy", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8591), "Full system access with all permissions", true, "Super Admin", null, null },
                    { 2, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8592), "Administrative access without role management", true, "Admin", null, null },
                    { 3, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8594), "Management level access to users and reports", true, "Manager", null, null },
                    { 4, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8595), "Team leadership access", true, "Team Lead", null, null },
                    { 5, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8596), "Basic user access to dashboard and assigned areas", true, "User", null, null }
                });

            migrationBuilder.InsertData(
                table: "RolePermissions",
                columns: new[] { "RolePermissionId", "AssignedBy", "AssignedDate", "PermissionId", "RoleId" },
                values: new object[,]
                {
                    { 1, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8615), 1, 1 },
                    { 2, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8616), 2, 1 },
                    { 3, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8617), 3, 1 },
                    { 4, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8618), 4, 1 },
                    { 5, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8619), 5, 1 },
                    { 6, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8620), 6, 1 },
                    { 7, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8621), 7, 1 },
                    { 8, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8622), 8, 1 },
                    { 9, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8624), 9, 1 },
                    { 10, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8625), 1, 2 },
                    { 11, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8667), 2, 2 },
                    { 12, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8668), 3, 2 },
                    { 13, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8669), 4, 2 },
                    { 14, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8670), 5, 2 },
                    { 15, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8671), 6, 2 },
                    { 16, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8672), 8, 2 },
                    { 17, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8673), 9, 2 },
                    { 18, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8675), 1, 3 },
                    { 19, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8676), 3, 3 },
                    { 20, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8677), 5, 3 },
                    { 21, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8677), 6, 3 },
                    { 22, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8678), 8, 3 },
                    { 23, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8680), 9, 3 },
                    { 24, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8680), 1, 4 },
                    { 25, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8681), 5, 4 },
                    { 26, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8682), 8, 4 },
                    { 27, null, new DateTime(2025, 10, 4, 5, 17, 5, 220, DateTimeKind.Utc).AddTicks(8683), 5, 5 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_Email",
                table: "UserProfiles",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_EmployeeId",
                table: "UserProfiles",
                column: "EmployeeId",
                unique: true,
                filter: "[EmployeeId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_PermissionCode",
                table: "Permissions",
                column: "PermissionCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_PermissionName",
                table: "Permissions",
                column: "PermissionName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_PermissionId",
                table: "RolePermissions",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_RoleId_PermissionId",
                table: "RolePermissions",
                columns: new[] { "RoleId", "PermissionId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Roles_RoleName",
                table: "Roles",
                column: "RoleName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_UserId_RoleId",
                table: "UserRoles",
                columns: new[] { "UserId", "RoleId" },
                unique: true,
                filter: "[IsActive] = 1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RolePermissions");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_UserProfiles_Email",
                table: "UserProfiles");

            migrationBuilder.DropIndex(
                name: "IX_UserProfiles_EmployeeId",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "AlternatePhone",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "Department",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "EmergencyContact",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "EmergencyContactPhone",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "HireDate",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "JobTitle",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "Manager",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "MiddleName",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "ProfilePicture",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "Salary",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "State",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "UserProfiles");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "UserProfiles",
                newName: "isActive");
        }
    }
}
