using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CareerAdvisorAPIs.Models
{
    public class JobApplicationAnswer
    {
        [Key]
        public int AnswerId { get; set; }

        [ForeignKey("JobApplication")]
        public int ApplicationID { get; set; }

        [ForeignKey("JobListingQuestion")]
        public int QuestionId { get; set; }

        [MaxLength(1000)]
        public string? Answer { get; set; }

        public JobApplication JobApplication { get; set; }
        public JobListingQuestion JobListingQuestion { get; set; }
    }
} 