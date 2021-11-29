using Microsoft.EntityFrameworkCore.Migrations;

namespace DrinksVendingMachine.Data.Migrations
{
    public partial class ImageExpansions_Migration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageExpansion",
                table: "Drink",
                type: "nvarchar(10)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageExpansion",
                table: "Drink");
        }
    }
}
