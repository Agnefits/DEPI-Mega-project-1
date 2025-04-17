using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
        Task<Token?> GetLastTokenByEmailAndNameAsync(string email, string tokenName);
    }
}
