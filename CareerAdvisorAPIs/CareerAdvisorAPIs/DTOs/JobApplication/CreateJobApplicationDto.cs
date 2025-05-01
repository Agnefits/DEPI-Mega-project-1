using CareerAdvisorAPIs.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.JobApplication
{

    public class CreateJobApplicationDto
    {
        [Required]
        public int JobID { get; set; }

        [Required, MaxLength(100)]
        public string Fullname { get; set; }

        [Required, EmailAddress, MaxLength(150)]
        public string Email { get; set; }

        [Required, MaxLength(20)]
        public string Phone { get; set; }

        [MaxLength(100)]
        public string? CurrentJob { get; set; }

        [Required, Url]
        public string LinkedInLink { get; set; }

        [Required, Url]
        public string PortfolioLink { get; set; }
        public string? AdditionalInformation { get; set; }
        public IFormFile? ResumeFile { get; set; }
    }
}
