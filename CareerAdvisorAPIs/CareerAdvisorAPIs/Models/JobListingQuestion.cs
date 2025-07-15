using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace CareerAdvisorAPIs.Models
{
    public class JobListingQuestion
    {
        [Key]
        public int QuestionId { get; set; }

        [ForeignKey("JobListing")]
        public int JobId { get; set; }

        [Required, MaxLength(200)]
        public string Title { get; set; }

        [Required, MaxLength(50)]
        public string Type { get; set; } // e.g., MultipleChoice, Text, etc.

        [MaxLength(1000)]
        public string? Answers { get; set; } // JSON or comma-separated answers

        [MaxLength(500)]
        public string? Correct { get; set; } // JSON or comma-separated correct answers

        public JobListing JobListing { get; set; }
    }
} 