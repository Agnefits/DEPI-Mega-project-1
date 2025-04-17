using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class JobApplicationRepository : Repository<JobApplication>, IJobApplicationRepository
    {
        public JobApplicationRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
