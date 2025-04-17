using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class InterviewSimulationRepository : Repository<InterviewSimulation>, IInterviewSimulationRepository
    {
        public InterviewSimulationRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
