using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.DTOs.Education;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class EducationRepository : Repository<Education>, IEducationRepository
    {
        public EducationRepository(CareerAdvisorCtx context) : base(context) { }

        public async Task<IEnumerable<EducationResponseDto>> GetAllByProfileIdAsync(int profileId)
        {
            return await _context.Educations
                .Where(e => e.ProfileID == profileId)
                .Select(e => new EducationResponseDto
                {
                    EducationID = e.EducationID,
                    University = e.University,
                    Degree = e.Degree,
                    DateFrom = e.DateFrom,
                    DateTo = e.DateTo,
                    Description = e.Description
                })
                .ToListAsync();
        }

    }
}
