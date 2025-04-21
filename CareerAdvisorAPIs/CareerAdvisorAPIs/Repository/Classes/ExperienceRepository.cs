using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.DTOs.Experience;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class ExperienceRepository : Repository<Experience>, IExperienceRepository
    {
        public ExperienceRepository(CareerAdvisorCtx context) : base(context) { }

        public async Task<IEnumerable<ExperienceResponseDto>?> GetAllByProfileIdAsync(int profileId)
        {
            return await _context.Experiences
                .Where(e => e.ProfileID == profileId)
                .Select(e => new ExperienceResponseDto
                {
                    ExperienceID = e.ExperienceID,
                    Title = e.Title,
                    Company = e.Company,
                    Type = e.Type,
                    DateFrom = e.DateFrom,
                    DateTo = e.DateTo,
                    City = e.City,
                    Country = e.Country,
                    Description = e.Description
                })
                .ToListAsync();
        }
    }
}
