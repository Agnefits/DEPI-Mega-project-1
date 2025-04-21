using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface IProfileRepository : IRepository<Profile>
    {
        Task<Profile?> GetByUserIdAsync(int userId);
    }

}
