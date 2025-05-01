using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface IJobApplicationRepository : IRepository<JobApplication>
    {
        Task<JobApplication> GetDetailedByIdAsync(int applicationId);
        Task<IEnumerable<JobApplication>> GetByUserIdAsync(int userId);
    }

}
