using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class InterviewSimulation
    {
        [Key]
        public int InterviewID { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }

        public DateTime InterviewDate { get; set; }

        public string AIFeedback { get; set; }

        public decimal ConfidenceScore { get; set; }

        public User User { get; set; }
    }
}
