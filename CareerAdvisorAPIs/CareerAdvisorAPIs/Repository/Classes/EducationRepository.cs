using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class EducationRepository : Repository<Education>, IEducationRepository
    {
        public EducationRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
