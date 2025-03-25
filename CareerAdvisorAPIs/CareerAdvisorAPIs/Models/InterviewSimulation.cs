using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class InterviewSimulation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int InterviewSimulationID { get; set; }

        [Required]
        public string AIFeedback { get; set; }

        public decimal ConfidenceScore { get; set; }

        public DateTime InterviewDate { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }
        public User User { get; set; }
    }
}
