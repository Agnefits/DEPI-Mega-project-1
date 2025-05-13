namespace CareerAdvisorAPIs.DTOs.JobListing
{
    public class RecommenderAIResponseDto
    {
        public IEnumerable<RecommendItem> recommendations { get; set; } = new List<RecommendItem>();
    }

    public class RecommendItem
    {
        public int job_id { get; set; }
        public double score { get; set; }
    }
}
