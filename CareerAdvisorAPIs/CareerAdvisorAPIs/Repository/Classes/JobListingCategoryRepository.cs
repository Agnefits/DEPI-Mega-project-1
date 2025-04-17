using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class JobListingCategoryRepository : Repository<JobListingCategory>, IJobListingCategoryRepository
    {
        public JobListingCategoryRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
