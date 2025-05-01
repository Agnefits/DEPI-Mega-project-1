using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.DTOs.JobListing;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class JobListingRepository : Repository<JobListing>, IJobListingRepository
    {
        public JobListingRepository(CareerAdvisorCtx context) : base(context) { }
        public async Task AddAsync(JobListing job, List<string> categories, List<string> skills, List<JobBenefit> benefits)
        {
            await _context.JobListings.AddAsync(job);
            await _context.SaveChangesAsync();

            await AddRelationsAsync(job, categories, skills, benefits);
        }

        public async Task UpdateAsync(JobListing job, List<string> categories, List<string> skills, List<JobBenefit> benefits)
        {
            _context.JobListings.Update(job);
            await _context.SaveChangesAsync();

            var existingCategories = _context.JobListingCategories.Where(x => x.JobID == job.JobID);
            var existingSkills = _context.JobListingSkills.Where(x => x.JobID == job.JobID);
            var existingBenefits = _context.JobBenefits.Where(x => x.JobID == job.JobID);

            _context.JobListingCategories.RemoveRange(existingCategories);
            _context.JobListingSkills.RemoveRange(existingSkills);
            _context.JobBenefits.RemoveRange(existingBenefits);

            await _context.SaveChangesAsync();

            await AddRelationsAsync(job, categories, skills, benefits);
        }

        private async Task AddRelationsAsync(JobListing job, List<string> categories, List<string> skills, List<JobBenefit> benefits)
        {
            foreach (var name in categories.Distinct())
            {
                var cat = await _context.JobCategories.FirstOrDefaultAsync(c => c.Name == name)
                          ?? new JobCategory { Name = name };
                if (cat.CategoryID == 0)
                {
                    _context.JobCategories.Add(cat);
                    await _context.SaveChangesAsync();
                }
                _context.JobListingCategories.Add(new JobListingCategory { JobID = job.JobID, CategoryID = cat.CategoryID });
            }

            foreach (var name in skills.Distinct())
            {
                var skill = await _context.Skills.FirstOrDefaultAsync(s => s.Name == name)
                            ?? new Skill { Name = name };
                if (skill.SkillID == 0)
                {
                    _context.Skills.Add(skill);
                    await _context.SaveChangesAsync();
                }
                _context.JobListingSkills.Add(new JobListingSkill { JobID = job.JobID, SkillID = skill.SkillID });
            }

            foreach (var b in benefits)
            {
                b.JobID = job.JobID;
                _context.JobBenefits.Add(b);
            }

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<JobListing>> SearchAsync(string keyword, string? country, string? city)
        {
            keyword = keyword.ToLower();
            country = (country ?? "").ToLower();
            city = (city ?? "").ToLower();

            return await _context.JobListings
                .Include(j => j.User)
                .Include(j => j.JobApplications).ThenInclude(ja => ja.User)
                .Include(j => j.JobListingCategories).ThenInclude(jc => jc.JobCategory)
                .Include(j => j.JobListingSkills).ThenInclude(js => js.Skill)
                .Include(j => j.JobBenefits)
                .Where(j =>
                    EF.Functions.Like(j.Title.ToLower(), $"%{keyword}%") ||
                    EF.Functions.Like(j.Company.ToLower() ?? "", $"%{keyword}%") ||
                    (EF.Functions.Like(j.City.ToLower() ?? "", $"%{city}%") && !city.IsNullOrEmpty()) ||
                    (EF.Functions.Like(j.Country.ToLower() ?? "", $"%{country}%") && !country.IsNullOrEmpty()) ||
                    EF.Functions.Like(j.Type.ToLower() ?? "", $"%{keyword}%") ||
                    EF.Functions.Like(j.Description.ToLower() ?? "", $"%{keyword}%") ||
                    j.JobListingSkills.Any(s => s.Skill.Name.ToLower().Contains(keyword)) ||
                    j.JobListingCategories.Any(c => c.JobCategory.Name.ToLower().Contains(keyword))
                )
                // Apply additional checks for date and capacity.
                .Where(j =>
                    DateTime.UtcNow <= j.ApplyBefore && // Check if the job is still open for applications.
                    (j.Capacity == null || j.JobApplications.Count() < j.Capacity) // Ensure job capacity isn't full.
                ).ToListAsync();
        }

        public async Task<JobListing?> GetDetailedByIdAsync(int id) =>
            await _context.JobListings
                .Include(j => j.User)
                .Include(j => j.JobApplications).ThenInclude(ja => ja.User)
                .Include(j => j.JobListingCategories).ThenInclude(jc => jc.JobCategory)
                .Include(j => j.JobListingSkills).ThenInclude(js => js.Skill)
                .Include(j => j.JobBenefits)
                .FirstOrDefaultAsync(j => j.JobID == id);

        public async Task<IEnumerable<JobListing>> GetDetailedAllAsync() =>
            await _context.JobListings
                .Include(j => j.User)
                .Include(j => j.JobApplications).ThenInclude(ja => ja.User)
                .Include(j => j.JobListingCategories).ThenInclude(jc => jc.JobCategory)
                .Include(j => j.JobListingSkills).ThenInclude(js => js.Skill)
                .Include(j => j.JobBenefits)
                // Apply additional checks for date and capacity.
                .Where(j =>
                    DateTime.UtcNow <= j.ApplyBefore && // Check if the job is still open for applications.
                    (j.Capacity == null || j.JobApplications.Count() < j.Capacity) // Ensure job capacity isn't full.
                ).ToListAsync();

        public async Task<IEnumerable<JobListing>> GetByUserIdAsync(int userId) =>
            await _context.JobListings
                .Include(j => j.User)
                .Include(j => j.JobApplications).ThenInclude(ja => ja.User)
                .Include(j => j.JobListingCategories).ThenInclude(jc => jc.JobCategory)
                .Include(j => j.JobListingSkills).ThenInclude(js => js.Skill)
                .Include(j => j.JobBenefits)
                .Where(ja => ja.UserID == userId)
                .ToListAsync();

        public async Task<IEnumerable<CategoryJobCountDto>> GetCategoryJobCountsAsync()
        {
            return await _context.JobCategories
                .Select(c => new CategoryJobCountDto
                {
                    CategoryName = c.Name,
                    JobCount = c.JobListingCategories
                        .Where(j =>
                            DateTime.UtcNow <= j.JobListing.ApplyBefore && // Check if the job is still open for applications.
                            (j.JobListing.Capacity == null || j.JobListing.JobApplications.Count() < j.JobListing.Capacity) // Ensure job capacity isn't full.
                        )
                        .Count() // Count jobs within the category based on the filter.
                })
                .ToListAsync();
        }
    }
}
