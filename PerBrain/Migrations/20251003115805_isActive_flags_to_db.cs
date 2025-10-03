using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PerBrain.Migrations
{
    /// <inheritdoc />
    public partial class isActive_flags_to_db : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "UserProfiles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "Countries",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isActive",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "isActive",
                table: "Countries");
        }
    }
}
