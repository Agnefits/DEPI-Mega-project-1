using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class JobBenefitRepository : Repository<JobBenefit>, IJobBenefitRepository
    {
        public JobBenefitRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
