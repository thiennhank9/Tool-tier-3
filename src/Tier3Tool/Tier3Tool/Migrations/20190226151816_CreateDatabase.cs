using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Tier3Tool.Migrations
{
    public partial class CreateDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Connections",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ConnectionName = table.Column<string>(maxLength: 50, nullable: true),
                    ConnectionType = table.Column<string>(maxLength: 50, nullable: true),
                    ServerName = table.Column<string>(maxLength: 50, nullable: true),
                    DatabaseName = table.Column<string>(maxLength: 50, nullable: true),
                    DatabaseUsername = table.Column<string>(maxLength: 50, nullable: true),
                    DatabasePassword = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connections", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(maxLength: 50, nullable: true),
                    Password = table.Column<string>(maxLength: 50, nullable: true),
                    IsAdmin = table.Column<bool>(nullable: true),
                    CanAccessDW = table.Column<bool>(nullable: true),
                    CanAccessHHAX = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "UQ__Connecti__38090CF9505F0640",
                table: "Connections",
                column: "ConnectionName",
                unique: true,
                filter: "[ConnectionName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UQ__Users__536C85E4F3745627",
                table: "Users",
                column: "Username",
                unique: true,
                filter: "[Username] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Connections");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
