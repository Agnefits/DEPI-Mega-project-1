using CareerAdvisorAPIs.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CareerAdvisorAPIs.DTOs.JobApplication;

namespace CareerAdvisorAPIs.DTOs.JobListing
{
    public class JobListingDto
    {
        public int JobID { get; set; }
        public int UserID { get; set; }
        public string Fullname { get; set; }
        public string? Email { get; set; }

        public string Title { get; set; }
        public string Company { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? Type { get; set; }
        public string? Description { get; set; }
        public string? Responsibilities { get; set; }
        public string? WhoYouAre { get; set; }
        public string? NiceToHaves { get; set; }
        public int? Capacity { get; set; }
        public int? ApplicationSent { get; set; }
        public DateTime? ApplyBefore { get; set; }
        public DateTime? JobPostedOn { get; set; }
        public decimal? SalaryFrom { get; set; }
        public decimal? SalaryTo { get; set; }

        public string? CompanyWebsite { get; set; }
        public string? Keywords { get; set; }
        public string? AdditionalInformation { get; set; }
        public string? CompanyPapers { get; set; }

        public List<string> Categories { get; set; }
        public List<string> Skills { get; set; }
        public List<JobBenefitDto> JobBenefits { get; set; }
        public List<JobApplicationDto>? JobApplications { get; set; }
    }
}
