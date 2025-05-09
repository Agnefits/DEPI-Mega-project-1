namespace CareerAdvisorAPIs.DTOs.JobListing
{
    public class FilterJobListingDto
    {
        public List<string>? Types { get; set; }
        public List<string>? Categories { get; set; }
        public decimal? SalaryFrom { get; set; }
        public decimal? SalaryTo { get; set; }
    }
}
