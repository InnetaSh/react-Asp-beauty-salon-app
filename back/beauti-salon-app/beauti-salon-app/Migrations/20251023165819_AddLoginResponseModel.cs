using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace beauti_salon_app.Migrations
{
    /// <inheritdoc />
    public partial class AddLoginResponseModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "OrderServices",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Price",
                table: "OrderServices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<double>(type: "REAL", nullable: false),
                    NewPrice = table.Column<double>(type: "REAL", nullable: false),
                    Category = table.Column<string>(type: "TEXT", nullable: false),
                    ProductClass = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    ImageSrc = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    Token = table.Column<string>(type: "TEXT", nullable: false),
                    RoleName = table.Column<int>(type: "INTEGER", nullable: false),
                    LastLogin = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UserType = table.Column<string>(type: "TEXT", maxLength: 8, nullable: false),
                    BonusCount = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrderProducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OrderDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: false),
                    ProductId = table.Column<int>(type: "INTEGER", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    ClientId = table.Column<int>(type: "INTEGER", nullable: true),
                    ClientName = table.Column<string>(type: "TEXT", nullable: true),
                    Contact = table.Column<string>(type: "TEXT", nullable: true),
                    DeliveryAddress = table.Column<string>(type: "TEXT", nullable: true),
                    PaymentMethod = table.Column<string>(type: "TEXT", nullable: true),
                    ClientId1 = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderProducts_Users_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_OrderProducts_Users_ClientId1",
                        column: x => x.ClientId1,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderServices_ClientId",
                table: "OrderServices",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProducts_ClientId",
                table: "OrderProducts",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProducts_ClientId1",
                table: "OrderProducts",
                column: "ClientId1");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProducts_ProductId",
                table: "OrderProducts",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderServices_Users_ClientId",
                table: "OrderServices",
                column: "ClientId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderServices_Users_ClientId",
                table: "OrderServices");

            migrationBuilder.DropTable(
                name: "OrderProducts");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_OrderServices_ClientId",
                table: "OrderServices");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "OrderServices");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "OrderServices");
        }
    }
}
