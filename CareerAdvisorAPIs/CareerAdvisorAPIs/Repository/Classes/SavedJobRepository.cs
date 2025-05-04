using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class SavedJobRepository : Repository<SavedJob>, ISavedJobRepository
    {
        public SavedJobRepository(CareerAdvisorCtx context) : base(context) { }

        public async Task<IEnumerable<JobListing>> GetSavedJobs(int userId)
        {
            return await _context.JobListings
                .Include(j => j.User)
                .Include(j => j.JobApplications).ThenInclude(ja => ja.User)
                .Include(j => j.JobListingCategories).ThenInclude(jc => jc.JobCategory)
                .Include(j => j.JobListingSkills).ThenInclude(js => js.Skill)
                .Include(j => j.JobBenefits)
                .Where(j => j.SavedJobs.Any(sj => sj.UserID == userId))
                .ToListAsync();
        }
        public async Task<JobListing?> GetByProfileAndJobIdAsync(int userId, int jobId)
        {
            return await _context.JobListings
                .Include(j => j.User)
                .Include(j => j.JobApplications).ThenInclude(ja => ja.User)
                .Include(j => j.JobListingCategories).ThenInclude(jc => jc.JobCategory)
                .Include(j => j.JobListingSkills).ThenInclude(js => js.Skill)
                .Include(j => j.JobBenefits)
                .FirstOrDefaultAsync(j => j.SavedJobs.Any(sj => sj.UserID == userId && sj.JobID == jobId));
        }
        public async Task<bool> Delete(int userId, int jobId)
        {
            var savedJob = await _context.SavedJobs
                .FirstOrDefaultAsync(sj => sj.UserID == userId && sj.JobID == jobId);
            if (savedJob != null)
            {
                _context.SavedJobs.Remove(savedJob);
                return true;
            }
            return false;
        }
    }
}
