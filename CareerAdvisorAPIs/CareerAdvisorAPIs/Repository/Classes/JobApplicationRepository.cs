using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class JobApplicationRepository : Repository<JobApplication>, IJobApplicationRepository
    {
        public JobApplicationRepository(CareerAdvisorCtx context) : base(context) { }

        public async Task<JobApplication?> GetDetailedByIdAsync(int id)
        {
            return await _context.JobApplications
                     .Include(j => j.User)
                     .Include(j => j.JobListing)
                         .ThenInclude(j => j.User)
                     .Include(j => j.JobListing)
                         .ThenInclude(j => j.JobListingCategories)
                             .ThenInclude(jc => jc.JobCategory)
                     .Include(j => j.JobListing)
                         .ThenInclude(j => j.JobListingSkills)
                             .ThenInclude(js => js.Skill)
                     .Include(j => j.JobListing)
                         .ThenInclude(j => j.JobBenefits)
                     .FirstOrDefaultAsync(a => a.ApplicationID == id);
        }


        public async Task<IEnumerable<JobApplication>> GetByUserIdAsync(int userId)
        {
            return await _context.JobApplications
                                 .Include(ja => ja.User)
                                 .Include(ja => ja.JobListing)
                                     .ThenInclude(j => j.User)
                                 .Include(j => j.JobListing)
                                     .ThenInclude(j => j.JobListingCategories)
                                         .ThenInclude(jc => jc.JobCategory)
                                 .Include(j => j.JobListing)
                                     .ThenInclude(j => j.JobListingSkills)
                                         .ThenInclude(js => js.Skill)
                                 .Include(j => j.JobListing)
                                     .ThenInclude(j => j.JobBenefits)
                                 .ToListAsync();
        }
    }
}
