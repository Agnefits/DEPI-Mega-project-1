namespace CareerAdvisorAPIs.DTOs.JobApplication
{
    public class JobApplicationAnswerDto
    {
        public int AnswerId { get; set; }
        public int ApplicationID { get; set; }
        public int QuestionId { get; set; }
        public string? Answer { get; set; }
        // Optionally, add question info if needed in the future
    }
} 