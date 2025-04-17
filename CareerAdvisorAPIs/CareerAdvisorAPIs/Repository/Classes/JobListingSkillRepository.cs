using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class JobListingSkillRepository : Repository<JobListingSkill>, IJobListingSkillRepository
    {
        public JobListingSkillRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
