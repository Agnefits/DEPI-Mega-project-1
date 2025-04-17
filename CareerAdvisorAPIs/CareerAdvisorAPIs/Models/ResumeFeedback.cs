using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class ResumeFeedback
    {
        [Key]
        public int FeedbackID { get; set; }

        [ForeignKey("Resume")]
        public int ResumeID { get; set; }

        public string FeedbackText { get; set; }

        public decimal Score { get; set; }

        public Resume Resume { get; set; }
    }
}
