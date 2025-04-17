using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class ExperienceRepository : Repository<Experience>, IExperienceRepository
    {
        public ExperienceRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
