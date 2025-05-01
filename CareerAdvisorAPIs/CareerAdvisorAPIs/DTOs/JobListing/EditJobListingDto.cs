using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.JobListing
{
    public class EditJobListingDto
    {
        [Required, MaxLength(200)]
        public string Title { get; set; }

        [Required, MaxLength(150)]
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
        public decimal? SalaryFrom { get; set; }
        public decimal? SalaryTo { get; set; }

        [Url]
        public string? CompanyWebsite { get; set; }

        public string? Keywords { get; set; }
        public string? AdditionalInformation { get; set; }
        public string? CompanyPapers { get; set; }

        public List<string>? Categories { get; set; }
        public List<string>? Skills { get; set; }

        public List<JobBenefitDto>? JobBenefits { get; set; }
    }
}
