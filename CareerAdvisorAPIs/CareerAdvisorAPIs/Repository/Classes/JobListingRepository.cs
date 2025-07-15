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

         public async Task<IEnumerable<JobListing>> SearchAsync(string keyword, string? country, string? city, int skip = 0, int limit = 100)
        {
            var query = _context.JobListings
                .Where(j => DateTime.UtcNow <= j.ApplyBefore &&
                            (j.Capacity == null || j.JobApplications.Count < j.Capacity));

            if (!string.IsNullOrEmpty(city))
                query = query.Where(j => j.City.ToLower().Contains(city.ToLower()));
            if (!string.IsNullOrEmpty(country))
                query = query.Where(j => j.Country.ToLower().Contains(country.ToLower()));

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                var keywordParts = Regex.Split(keyword.ToLower(), @"[\s\-_/\\]+")
                    .Where(k => !string.IsNullOrWhiteSpace(k))
                    .ToList();


                foreach (var part in keywordParts)
                {
                    var p = part; // avoid modified closure
                    query = query.Where(j =>
                        j.Title.ToLower().Contains(p) ||
                        (j.Company != null && j.Company.ToLower().Contains(p)) ||
                        (j.Type != null && j.Type.ToLower().Contains(p)) ||
                        (j.Description != null && j.Description.ToLower().Contains(p)) ||
                        j.JobListingSkills.Any(s => s.Skill.Name.ToLower().Contains(p)) ||
                        j.JobListingCategories.Any(c => c.JobCategory.Name.ToLower().Contains(p))
                    );
                }

                // Scoring: sum for all parts
                var scored = query.Select(j => new {
                    Job = j,
                    Score = keywordParts.Sum(part =>
                        (j.Title.ToLower().Contains(part) ? 5 : 0) +
                        ((j.Company != null && j.Company.ToLower().Contains(part)) ? 4 : 0) +
                        ((j.Type != null && j.Type.ToLower().Contains(part)) ? 2 : 0) +
                        ((j.Description != null && j.Description.ToLower().Contains(part)) ? 1 : 0) +
                        (j.JobListingSkills.Any(s => s.Skill.Name.ToLower().Contains(part)) ? 2 : 0) +
                        (j.JobListingCategories.Any(c => c.JobCategory.Name.ToLower().Contains(part)) ? 2 : 0)
                    )
                })
                .OrderByDescending(x => x.Score)
                .Skip(skip)
                .Take(limit);

                var results = await scored.Select(x => x.Job)
                    .Include(j => j.User)
                    .Include(j => j.JobApplications).ThenInclude(ja => ja.User)
                    .Include(j => j.JobListingCategories).ThenInclude(jc => jc.JobCategory)
                    .Include(j => j.JobListingSkills).ThenInclude(js => js.Skill)
                    .Include(j => j.JobBenefits)
                    .ToListAsync();
                return results;
            }
            else
            {
                var results = await query
                    .OrderByDescending(j => j.JobPostedOn)
                    .Skip(skip)
                    .Take(limit)
                    .Include(j => j.User)
                    .Include(j => j.JobApplications).ThenInclude(ja => ja.User)
                    .Include(j => j.JobListingCategories).ThenInclude(jc => jc.JobCategory)
                    .Include(j => j.JobListingSkills).ThenInclude(js => js.Skill)
                    .Include(j => j.JobBenefits)
                    .ToListAsync();
                return results;
            }
        }


        public async Task<IEnumerable<JobListing>> FilterAsync(FilterJobListingDto dto, int skip = 0, int limit = 100)
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

            return await query.Skip(skip).Take(limit).ToListAsync();
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
                .Include(j => j.JobApplications).ThenInclude(ja => ja.JobApplicationAnswers)
                .Include(j => j.JobListingCategories).ThenInclude(jc => jc.JobCategory)
                .Include(j => j.JobListingSkills).ThenInclude(js => js.Skill)
                .Include(j => j.JobBenefits)
                .Include(j => j.JobListingQuestions)
                .FirstOrDefaultAsync(j => j.JobID == id);

        public async Task<IEnumerable<JobListing>> GetDetailedAllAsync(int skip = 0, int limit = 100) =>
            await _context.JobListings
                .Include(j => j.User)
                .Include(j => j.JobApplications).ThenInclude(ja => ja.User)
                .Include(j => j.JobApplications).ThenInclude(ja => ja.JobApplicationAnswers)
                .Include(j => j.JobListingCategories).ThenInclude(jc => jc.JobCategory)
                .Include(j => j.JobListingSkills).ThenInclude(js => js.Skill)
                .Include(j => j.JobBenefits)
                .Include(j => j.JobListingQuestions)
                // Apply additional checks for date and capacity.
                .Where(j =>
                    DateTime.UtcNow <= j.ApplyBefore && // Check if the job is still open for applications.
                    (j.Capacity == null || j.JobApplications.Count() < j.Capacity) // Ensure job capacity isn't full.
                )
                .Skip(skip)
                .Take(limit)
                .ToListAsync();

        public async Task<IEnumerable<JobListing>> GetByUserIdAsync(int userId) =>
            await _context.JobListings
                .Include(j => j.User)
                .Include(j => j.JobApplications).ThenInclude(ja => ja.User)
                .Include(j => j.JobApplications).ThenInclude(ja => ja.JobApplicationAnswers)
                .Include(j => j.JobListingCategories).ThenInclude(jc => jc.JobCategory)
                .Include(j => j.JobListingSkills).ThenInclude(js => js.Skill)
                .Include(j => j.JobBenefits)
                .Include(j => j.JobListingQuestions)
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

        private string Normalize(string input) =>
            Regex.Replace(input?.ToLower() ?? "", @"[^a-z0-9]", "");
    }
}
