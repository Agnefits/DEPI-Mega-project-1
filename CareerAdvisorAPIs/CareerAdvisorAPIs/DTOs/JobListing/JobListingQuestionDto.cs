using System.Collections.Generic;

namespace CareerAdvisorAPIs.DTOs.JobListing
{
    public class JobListingQuestionDto
    {
        public int QuestionId { get; set; }
        public int JobId { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string? Answers { get; set; }
        public string? Correct { get; set; }
    }
} 