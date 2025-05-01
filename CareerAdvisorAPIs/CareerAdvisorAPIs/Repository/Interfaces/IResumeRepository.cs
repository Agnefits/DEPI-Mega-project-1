using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface IResumeRepository : IRepository<Resume> {

        Task<IEnumerable<Resume>> GetAllResumesByUserId(int userId);
        Task<Resume?> GetResumeWithFeedback(int resumeId);
    }
}
