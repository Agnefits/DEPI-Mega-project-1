using CareerAdvisorAPIs.DTOs.Education;
using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface IEducationRepository : IRepository<Education> { 
    
    Task<IEnumerable<EducationResponseDto>?> GetAllByProfileIdAsync(int profileId);
    }

}
