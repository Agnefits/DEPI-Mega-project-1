using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.JobListing
{
    public class EditJobListingQuestionDto
    {
        [Required, MaxLength(200)]
        public string Title { get; set; }
        [Required, MaxLength(50)]
        public string Type { get; set; }
        [MaxLength(1000)]
        public string? Answers { get; set; }
        [MaxLength(500)]
        public string? Correct { get; set; }
        [Required]
        public int QuestionId { get; set; }
    }
} 