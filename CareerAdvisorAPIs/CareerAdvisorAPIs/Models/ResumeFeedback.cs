using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class ResumeFeedback
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ResumeFeedbackID { get; set; }

        [Required]
        public string ResumeFile { get; set; }

        [Required]
        public string FeedbackText { get; set; }

        public decimal Score { get; set; }

        public DateTime CreatedAt { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }
        public User User { get; set; }
    }
}
