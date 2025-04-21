using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface ISkillRepository : IRepository<Skill>
    {
        Task<Skill?> GetByNameAsync(string name);
    }

}
