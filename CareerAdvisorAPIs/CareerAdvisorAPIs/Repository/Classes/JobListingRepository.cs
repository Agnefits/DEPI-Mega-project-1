using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class JobListingRepository : Repository<JobListing>, IJobListingRepository
    {
        public JobListingRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
