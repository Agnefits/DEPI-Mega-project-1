using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class ResumeFeedbackRepository : Repository<ResumeFeedback>, IResumeFeedbackRepository
    {
        public ResumeFeedbackRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
