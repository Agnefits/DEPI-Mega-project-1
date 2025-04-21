using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface IUserSkillRepository : IRepository<UserSkill>
    {
        Task<UserSkill?> GetByProfileAndSkillIdAsync(int profileId, int skillId);
        Task<bool> Delete(int profileId, int skillId);
    }

}
