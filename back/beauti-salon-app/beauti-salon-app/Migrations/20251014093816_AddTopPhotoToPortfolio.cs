using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace beauti_salon_app.Migrations
{
    /// <inheritdoc />
    public partial class AddTopPhotoToPortfolio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "TopPhoto",
                table: "PortfolioItems",
                type: "INTEGER",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TopPhoto",
                table: "PortfolioItems");
        }
    }
}
