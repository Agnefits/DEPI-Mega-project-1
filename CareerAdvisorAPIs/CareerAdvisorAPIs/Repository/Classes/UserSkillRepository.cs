using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class UserSkillRepository : Repository<UserSkill>, IUserSkillRepository
    {
        public UserSkillRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
