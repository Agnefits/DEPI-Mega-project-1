using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.DTOs.Portfolio;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class PortfolioRepository : Repository<Portfolio>, IPortfolioRepository
    {
        public PortfolioRepository(CareerAdvisorCtx context) : base(context) { }

        public async Task<IEnumerable<PortfolioResponseDto>?> GetAllByProfileIdAsync(int profileId)
        {
            return await _context.Portfolios
                .Where(p => p.ProfileID == profileId)
                .Select(p => new PortfolioResponseDto
                {
                    PortfolioID = p.PortfolioID,
                    Image = p.Image,
                    Title = p.Title,
                    Description = p.Description,
                    Date = p.Date
                })
                .ToListAsync();
        }

    }
}
