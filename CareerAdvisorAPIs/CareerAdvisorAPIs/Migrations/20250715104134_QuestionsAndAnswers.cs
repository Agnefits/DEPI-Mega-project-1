using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CareerAdvisorAPIs.Migrations
{
    /// <inheritdoc />
    public partial class QuestionsAndAnswers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobListingQuestions",
                columns: table => new
                {
                    QuestionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Answers = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Correct = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobListingQuestions", x => x.QuestionId);
                    table.ForeignKey(
                        name: "FK_JobListingQuestions_JobListings_JobId",
                        column: x => x.JobId,
                        principalTable: "JobListings",
                        principalColumn: "JobID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobApplicationAnswers",
                columns: table => new
                {
                    AnswerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationID = table.Column<int>(type: "int", nullable: false),
                    QuestionId = table.Column<int>(type: "int", nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobApplicationAnswers", x => x.AnswerId);
                    table.ForeignKey(
                        name: "FK_JobApplicationAnswers_JobApplications_ApplicationID",
                        column: x => x.ApplicationID,
                        principalTable: "JobApplications",
                        principalColumn: "ApplicationID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobApplicationAnswers_JobListingQuestions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "JobListingQuestions",
                        principalColumn: "QuestionId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobApplicationAnswers_ApplicationID",
                table: "JobApplicationAnswers",
                column: "ApplicationID");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplicationAnswers_QuestionId",
                table: "JobApplicationAnswers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_JobListingQuestions_JobId",
                table: "JobListingQuestions",
                column: "JobId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobApplicationAnswers");

            migrationBuilder.DropTable(
                name: "JobListingQuestions");
        }
    }
}
