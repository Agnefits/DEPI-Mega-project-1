using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class SkillRepository : Repository<Skill>, ISkillRepository
    {
        public SkillRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
