using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class JobApplication
    {
        [Key]
        public int ApplicationID { get; set; }

        [ForeignKey("JobListing")]
        public int JobID { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }

        [Required, MaxLength(100)]
        public string Fullname { get; set; }

        [Required, EmailAddress, MaxLength(150)]
        public string Email { get; set; }

        [MaxLength(20)]
        public string Phone { get; set; }

        [MaxLength(100)]
        public string? CurrentJob { get; set; }

        [Url]
        public string LinkedInLink { get; set; }

        [Url]
        public string PortfolioLink { get; set; }
        public string? AdditionalInformation { get; set; }
        public string? ResumeFile { get; set; }
        public DateTime AppliedDate { get; set; }

        [MaxLength(50)]
        public string Status { get; set; }

        public User User { get; set; }
        public JobListing JobListing { get; set; }
    }
}
