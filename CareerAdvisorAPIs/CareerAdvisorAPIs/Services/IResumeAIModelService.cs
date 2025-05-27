using CareerAdvisorAPIs.DTOs.Resume;

namespace CareerAdvisorAPIs.Services
{
    public interface IResumeAIModelService
    {
        Task<ResumeAIResponseDto?> PostResumeAsync(ResumeAIRequestDto resume);
    }
}
