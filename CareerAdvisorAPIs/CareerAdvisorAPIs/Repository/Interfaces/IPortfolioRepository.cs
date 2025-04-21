using CareerAdvisorAPIs.DTOs.Portfolio;
using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface IPortfolioRepository : IRepository<Portfolio>
    {
        Task<IEnumerable<PortfolioResponseDto>?> GetAllByProfileIdAsync(int profileId);
    }

}
