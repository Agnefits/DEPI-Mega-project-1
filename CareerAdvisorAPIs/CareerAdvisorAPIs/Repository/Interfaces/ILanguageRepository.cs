using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface ILanguageRepository : IRepository<Language>
    {
        Task<Language?> GetByNameAsync(string name);
    }

}
