namespace CareerAdvisorAPIs.DTOs.JobListing
{
    public class JobAIResponseDto
    {
        public string status { get; set; }
        public string job_id { get; set; }
        public double[] embedding { get; set; }
    }
}
