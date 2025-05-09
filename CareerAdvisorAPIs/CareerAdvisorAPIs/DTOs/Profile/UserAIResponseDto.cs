namespace CareerAdvisorAPIs.DTOs.JobListing
{
    public class UserAIResponseDto
    {
        public string status { get; set; }
        public string user_id { get; set; }
        public double[] embedding { get; set; }
    }
}
