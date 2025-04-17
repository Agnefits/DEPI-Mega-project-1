using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class JobCategoryRepository : Repository<JobCategory>, IJobCategoryRepository
    {
        public JobCategoryRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
