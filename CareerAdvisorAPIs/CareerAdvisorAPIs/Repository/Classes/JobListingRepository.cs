using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.DTOs.JobListing;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using CareerAdvisorAPIs.Services;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class JobListingRepository : Repository<JobListing>, IJobListingRepository
    {
        private readonly IJobAIModelService _jobAIModelService;
        public JobListingRepository(CareerAdvisorCtx context, IJobAIModelService jobAIModelService) : base(context)
        {
            _jobAIModelService = jobAIModelService;
        }
        public async Task AddAsync(JobListing job, List<string> categories, List<string> skills, List<JobBenefit> benefits)
        {
            await _context.JobListings.AddAsync(job);
            await _context.SaveChangesAsync();

            await AddRelationsAsync(job, categories, skills, benefits);

            // Send to AI job model

            var aiRequest = new JobAIRequestDto
            {
                job_id = job.JobID,
                description = "title: " + job.Title +
                "\r\nkeywords: " + (job.Keywords ?? "Empty") +
                "\r\ncategories: " + string.Join(", ", job.JobListingCategories.Select(jc => jc.JobCategory.Name)) +
                "\r\ntype: " + (job.Type ?? "Empty") +
                "\r\nrequired skills: " + string.Join(", ", job.JobListingSkills) +
                "\r\nnice to have: " + (/*job.NiceToHaves ?? ""*/"Empty") +
                "\r\nresponsibilities: " + (job.Responsibilities ?? "Empty") +
                "\r\ndescription: " + (job.Description ?? "Empty") +
                "\r\nwho you are: " + (/*job.WhoYouAre ?? ""*/"Empty"),
            };

            var aiResponse = await _jobAIModelService.PostJobAsync(aiRequest);

            if (aiResponse != null)
            {
                job.WeightsJson = aiResponse.embedding.ToString();
                await _context.SaveChangesAsync();
            }
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


            // Send to AI job model

            var aiRequest = new JobAIRequestDto
            {
                job_id = job.JobID,
                description = "title: " + job.Title +
                "\r\nkeywords: " + (job.Keywords ?? "Empty") +
                "\r\ncategories: " + string.Join(", ", job.JobListingCategories.Select(jc => jc.JobCategory.Name)) +
                "\r\ntype: " + (job.Type ?? "Empty") +
                "\r\nrequired skills: " + string.Join(", ", job.JobListingSkills) +
                "\r\nnice to have: " + (/*job.NiceToHaves ?? ""*/"Empty") +
                "\r\nresponsibilities: " + (job.Responsibilities ?? "Empty") +
                "\r\ndescription: " + (job.Description ?? "Empty") +
                "\r\nwho you are: " + (/*job.WhoYouAre ?? ""*/"Empty"),
            };

            var aiResponse = await _jobAIModelService.PostJobAsync(aiRequest);

            if (aiResponse != null)
            {
                job.WeightsJson = JsonConvert.SerializeObject(aiResponse.embedding);
                await _context.SaveChangesAsync();
            }
        }

        private async Task AddRelationsAsync(JobListing job, List<string> categories, List<string> skills, List<JobBenefit> benefits)
        {
            foreach (var name in categories.Distinct(StringComparer.OrdinalIgnoreCase))
            {
                try
                {
                    var cat = await _context.JobCategories.FirstOrDefaultAsync(c => c.Name.ToLower() == name.ToLower())
                              ?? new JobCategory { Name = name };
                    if (cat.CategoryID == 0)
                    {
                        await _context.JobCategories.AddAsync(cat);
                        await _context.SaveChangesAsync();
                    }

                    await _context.JobListingCategories.AddAsync(new JobListingCategory { JobID = job.JobID, CategoryID = cat.CategoryID });
                }
                catch { }
            }

            foreach (var name in skills.Distinct(StringComparer.OrdinalIgnoreCase))
            {
                try
                {
                    var skill = await _context.Skills.FirstOrDefaultAsync(s => s.Name.ToLower() == name.ToLower())
                            ?? new Skill { Name = name };
                    if (skill.SkillID == 0)
                    {
                        await _context.Skills.AddAsync(skill);
                        await _context.SaveChangesAsync();
                    }

                    await _context.JobListingSkills.AddAsync(new JobListingSkill { JobID = job.JobID, SkillID = skill.SkillID });
                }
                catch { }
            }

            foreach (var b in benefits)
            {
                try
                {
                    b.JobID = job.JobID;
                    await _context.JobBenefits.AddAsync(b);
                }
                catch { }
            }

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<JobListing>> SearchAsync(string keyword, string? country, string? city)
        {
            string Normalize(string input)
            {
                if (string.IsNullOrWhiteSpace(input)) return "";
                var normalized = Regex.Replace(input.ToLower(), @"[^a-z0-9]", " ");
                return Regex.Replace(normalized, @"\s+", " ").Trim();
            }

            var normalizedKeyword = Normalize(keyword ?? "");
            var keywordParts = normalizedKeyword.Split(" ", StringSplitOptions.RemoveEmptyEntries);
            var normalizedCity = Normalize(city ?? "");
            var normalizedCountry = Normalize(country ?? "");

            // Step 1: Filter listings in DB
            var jobListings = await _context.JobListings
                .Include(j => j.User)
                .Include(j => j.JobApplications).ThenInclude(ja => ja.User)
                .Include(j => j.JobListingCategories).ThenInclude(jc => jc.JobCategory)
                .Include(j => j.JobListingSkills).ThenInclude(js => js.Skill)
                .Include(j => j.JobBenefits)
                .Where(j => DateTime.UtcNow <= j.ApplyBefore &&
                            (j.Capacity == null || j.JobApplications.Count < j.Capacity))
                .ToListAsync();

            // Step 2: Apply filtering + scoring
            var filteredAndRanked = jobListings
                .Where(j =>
                    (string.IsNullOrEmpty(normalizedCity) || Normalize(j.City ?? "").Contains(normalizedCity)) &&
                    (string.IsNullOrEmpty(normalizedCountry) || Normalize(j.Country ?? "").Contains(normalizedCountry)))
                .Select(j => new
                {
                    Job = j,
                    Score = keywordParts.Sum(k =>
                        (Normalize(j.Title).Contains(k) ? 5 : 0) +
                        (Normalize(j.Company ?? "").Contains(k) ? 4 : 0) +
                        (Normalize(j.Type ?? "").Contains(k) ? 2 : 0) +
                        (Normalize(j.Description ?? "").Contains(k) ? 1 : 0) +
                        (j.JobListingSkills.Any(s => Normalize(s.Skill.Name).Contains(k)) ? 2 : 0) +
                        (j.JobListingCategories.Any(c => Normalize(c.JobCategory.Name).Contains(k)) ? 2 : 0)
                    )
                })
                .Where(x => x.Score > 0)
                .OrderByDescending(x => x.Score)
                .Select(x => x.Job);

            return filteredAndRanked;
        }


        public async Task<IEnumerable<JobListing>> FilterAsync(FilterJobListingDto dto)
        {
            var query = _context.JobListings
                .Include(j => j.User)
                .Include(j => j.JobApplications).ThenInclude(ja => ja.User)
                .Include(j => j.JobListingCategories).ThenInclude(jc => jc.JobCategory)
                .Include(j => j.JobListingSkills).ThenInclude(js => js.Skill)
                .Include(j => j.JobBenefits)
                .AsQueryable();
            if (dto.Categories != null && dto.Categories.Any())
            {
                query = query.Where(j =>
                    j.JobListingCategories.Any(c => dto.Categories.Contains(c.JobCategory.Name)));
            }
            if (dto.Types != null && dto.Types.Any())
            {
                query = query.Where(j =>
                    j.JobListingSkills.Any(s => dto.Types.Contains(s.JobListing.Type ?? "")));
            }
            if (dto.SalaryFrom != null)
            {
                query = query.Where(j => j.SalaryFrom >= dto.SalaryFrom);
            }
            if (dto.SalaryTo != null)
            {
                query = query.Where(j => j.SalaryTo <= dto.SalaryTo);
            }

            return await query.ToListAsync();
        }
        public async Task<IEnumerable<JobListing>> RecommendAsync(int userId)
        {
            var profile = await _context.Profiles.FirstAsync(p => p.UserID == userId);

            if (profile.WeightsJson == null)
            {
                // Send skills to AI Model
                var userAiRequest = new UserAIRequestDto
                {
                    user_id = profile.UserID,
                    skills = profile.UserSkills.Select(us => us.Skill.Name).ToList()
                };

                var aiModelResponse = await _jobAIModelService.PostUserAsync(userAiRequest);
                if (aiModelResponse != null)
                    profile.WeightsJson = JsonConvert.SerializeObject(aiModelResponse.embedding);

                await _context.SaveChangesAsync();
            }

            var jobs = await _context.JobListings
                .Include(j => j.JobApplications).ThenInclude(ja => ja.User)
                .Where(j => DateTime.UtcNow <= j.ApplyBefore &&
                        (j.Capacity == null || j.JobApplications.Count() < j.Capacity) && j.WeightsJson != null)
                .Select(j => new JobListing
                {
                    JobID = j.JobID,
                    WeightsJson = j.WeightsJson
                })
                .ToListAsync();


            var aiRequest = new RecommenderAIRequestDto
            {
                user_id = userId,
                user_embedding = JsonConvert.DeserializeObject<IEnumerable<double>>(profile.WeightsJson),
                job_ids = jobs.Select(j => j.JobID).ToList(),
                job_embeddings = jobs.Select(j => JsonConvert.DeserializeObject<IEnumerable<double>>(j.WeightsJson)).ToList(),
                top_k = 100,
            };

            var aiResponse = await _jobAIModelService.PostRecommenderAsync(aiRequest);
            if (aiResponse != null)
            {
                var recommendedJobs = new List<JobListing>();
                foreach (var recommend in aiResponse.recommendations)
                {
                    var job = await _context.JobListings
                        .Include(j => j.User)
                        .Include(j => j.JobApplications).ThenInclude(ja => ja.User)
                        .Include(j => j.JobListingCategories).ThenInclude(jc => jc.JobCategory)
                        .Include(j => j.JobListingSkills).ThenInclude(js => js.Skill)
                        .Include(j => j.JobBenefits)
                        .FirstAsync(j => j.JobID == recommend.job_id);

                    if (job != null)
                    {
                        recommendedJobs.Add(job);
                    }
                }
                return recommendedJobs;
            }

            return [];
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
