using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class update_database_v1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "TransType",
                table: "TransactionDetail",
                type: "int",
                nullable: false,
                defaultValue: 1,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddCheckConstraint(
                name: "CK_TransactionDetail_TransType",
                table: "TransactionDetail",
                sql: "[TransType] IN (1, 2)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_TransactionDetail_TransType",
                table: "TransactionDetail");

            migrationBuilder.AlterColumn<int>(
                name: "TransType",
                table: "TransactionDetail",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 1);
        }
    }
}
