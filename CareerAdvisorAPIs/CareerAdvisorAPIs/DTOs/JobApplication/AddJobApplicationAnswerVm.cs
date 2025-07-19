using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.JobApplication
{
    public class AddJobApplicationAnswerVm
    {
        [Required]
        public int QuestionId { get; set; }
        [Required, MaxLength(1000)]
        public string Answer { get; set; }
    }
} 