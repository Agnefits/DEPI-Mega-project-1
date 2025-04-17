using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class ResumeRepository : Repository<Resume>, IResumeRepository
    {
        public ResumeRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
