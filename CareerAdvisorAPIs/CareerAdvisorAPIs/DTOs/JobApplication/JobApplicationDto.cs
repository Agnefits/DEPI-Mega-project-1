using CareerAdvisorAPIs.DTOs.JobListing;

namespace CareerAdvisorAPIs.DTOs.JobApplication
{
    public class JobApplicationDto
    {
        public int ApplicationID { get; set; }
        public int UserID { get; set; }

        public string Fullname { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public string? CurrentJob { get; set; }

        public string LinkedInLink { get; set; }
        public string PortfolioLink { get; set; }
        public string? AdditionalInformation { get; set; }
        public string? ResumeFile { get; set; }

        public DateTime AppliedDate { get; set; }
        public string Status { get; set; }
        public JobListingDto JobListing { get; set; }
        public List<JobApplicationAnswerDto>? Answers { get; set; }
    }

}
