using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class HelpRepository : Repository<Help>, IHelpRepository
    {
        public HelpRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
