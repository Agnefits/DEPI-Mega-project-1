using CareerAdvisorAPIs.DTOs.Experience;
using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface IExperienceRepository : IRepository<Experience>
    {
        Task<IEnumerable<ExperienceResponseDto>?> GetAllByProfileIdAsync(int profileId);
    }
}
