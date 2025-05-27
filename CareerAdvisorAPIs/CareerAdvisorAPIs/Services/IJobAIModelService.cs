using CareerAdvisorAPIs.DTOs.JobListing;

namespace CareerAdvisorAPIs.Services
{
    public interface IJobAIModelService
    {
        Task<JobAIResponseDto?> PostJobAsync(JobAIRequestDto job);
        Task<UserAIResponseDto?> PostUserAsync(UserAIRequestDto user);
        Task<RecommenderAIResponseDto?> PostRecommenderAsync(RecommenderAIRequestDto request);
    }
}
