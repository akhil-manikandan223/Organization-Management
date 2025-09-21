using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PerBrain.Migrations
{
    /// <inheritdoc />
    public partial class Update_userId_to_UserId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "userId",
                table: "UserProfiles",
                newName: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserProfiles",
                newName: "userId");
        }
    }
}
