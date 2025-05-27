namespace CareerAdvisorAPIs.DTOs.JobListing
{
    public class RecommenderAIRequestDto
    {
        public int user_id { get; set; }
        public IEnumerable<double> user_embedding { get; set; }
        public IEnumerable<int> job_ids { get; set; }
        public IEnumerable<IEnumerable<double>> job_embeddings { get; set; }
        public int top_k { get; set; }
    }
}
