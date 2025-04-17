using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class JobListing
    {
        [Key]
        public int JobID { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }

        [Required, MaxLength(200)]
        public string Title { get; set; }

        [MaxLength(150)]
        public string Company { get; set; }

        [MaxLength(100)]
        public string? City { get; set; }

        [MaxLength(100)]
        public string? Country { get; set; }

        [MaxLength(50)]
        public string? Type { get; set; }
        public string? Description { get; set; }
        public string? Responsibilities { get; set; }
        public string? WhoYouAre { get; set; }
        public string? NiceToHaves { get; set; }
        public int? Capacity { get; set; }
        public DateTime? ApplyBefore { get; set; }
        public DateTime? JobPostedOn { get; set; }
        public decimal? SalaryFrom { get; set; }
        public decimal? SalaryTo { get; set; }

        [MaxLength(200)]
        public string? CompanyWebsite { get; set; }
        public string? Keywords { get; set; }
        public string? AdditionalInformation { get; set; }
        public string? CompanyPapers { get; set; }

        public User User { get; set; }
        public ICollection<JobListingCategory> JobListingCategories { get; set; }
        public ICollection<JobListingSkill> JobListingSkills { get; set; }
        public ICollection<JobBenefit> JobBenefits { get; set; }
        public ICollection<JobApplication> JobApplications { get; set; }
        public ICollection<SavedJob> SavedJobs { get; set; }
    }
}
