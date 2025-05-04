using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface ISavedJobRepository : IRepository<SavedJob>
    {
        Task<IEnumerable<JobListing>> GetSavedJobs(int userId);
        Task<JobListing?> GetByProfileAndJobIdAsync(int userId, int jobId);
        Task<bool> Delete(int userId, int jobId);
    }
}
