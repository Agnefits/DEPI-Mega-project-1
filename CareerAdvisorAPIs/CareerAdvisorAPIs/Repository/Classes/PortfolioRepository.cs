using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class PortfolioRepository : Repository<Portfolio>, IPortfolioRepository
    {
        public PortfolioRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
