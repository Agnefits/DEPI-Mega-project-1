using CareerAdvisorAPIs.DTOs.JobApplication;
using CareerAdvisorAPIs.DTOs.JobListing;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CareerAdvisorAPIs.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/JobListing")]
    public partial class JobListingController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public JobListingController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        private async Task<(User user, Profile profile, IActionResult errorResult)> GetAuthenticatedUserAndProfileAsync()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return (null, null, Unauthorized("Unauthorized user"));

            var user = await _unitOfWork.Users.GetByIdAsync(int.Parse(userId));
            if (user == null)
                return (null, null, NotFound("User not found"));

            var profile = await _unitOfWork.Profiles.GetByUserIdAsync(user.UserID);
            return (user, profile, null);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var jobs = await _unitOfWork.JobListings.GetDetailedAllAsync();

            var dtos = jobs.Select(job => new JobListingDto
            {
                JobID = job.JobID,
                UserID = job.UserID,
                Email = job.User.Email,
                Fullname = job.User.Fullname,
                Title = job.Title,
                Company = job.Company,
                City = job.City,
                Country = job.Country,
                Type = job.Type,
                Description = job.Description,
                Responsibilities = job.Responsibilities,
                WhoYouAre = job.WhoYouAre,
                NiceToHaves = job.NiceToHaves,
                Capacity = job.Capacity,
                ApplicationSent = job.JobApplications.Count(),
                ApplyBefore = job.ApplyBefore,
                JobPostedOn = job.JobPostedOn,
                SalaryFrom = job.SalaryFrom,
                SalaryTo = job.SalaryTo,
                CompanyWebsite = job.CompanyWebsite,
                Keywords = job.Keywords,
                AdditionalInformation = job.AdditionalInformation,
                CompanyPapers = job.CompanyPapers,
                Categories = job.JobListingCategories.Select(c => c.JobCategory.Name).ToList(),
                Skills = job.JobListingSkills.Select(s => s.Skill.Name).ToList(),
                JobBenefits = job.JobBenefits.Select(b => new JobBenefitDto
                {
                    Title = b.Title,
                    Description = b.Description,
                }).ToList(),
            }).ToList();

            return Ok(dtos);
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMy()
        {
            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            var jobs = await _unitOfWork.JobListings.GetByUserIdAsync(user.UserID);

            var dtos = jobs.Select(job => new JobListingDto
            {
                JobID = job.JobID,
                UserID = job.UserID,
                Email = job.User.Email,
                Fullname = job.User.Fullname,
                Title = job.Title,
                Company = job.Company,
                City = job.City,
                Country = job.Country,
                Type = job.Type,
                Description = job.Description,
                Responsibilities = job.Responsibilities,
                WhoYouAre = job.WhoYouAre,
                NiceToHaves = job.NiceToHaves,
                Capacity = job.Capacity,
                ApplicationSent = job.JobApplications.Count(),
                ApplyBefore = job.ApplyBefore,
                JobPostedOn = job.JobPostedOn,
                SalaryFrom = job.SalaryFrom,
                SalaryTo = job.SalaryTo,
                CompanyWebsite = job.CompanyWebsite,
                Keywords = job.Keywords,
                AdditionalInformation = job.AdditionalInformation,
                CompanyPapers = job.CompanyPapers,
                Categories = job.JobListingCategories.Select(c => c.JobCategory.Name).ToList(),
                Skills = job.JobListingSkills.Select(s => s.Skill.Name).ToList(),
                JobBenefits = job.JobBenefits.Select(b => new JobBenefitDto
                {
                    Title = b.Title,
                    Description = b.Description,
                }).ToList(),
                JobApplications = user.UserID == job.UserID ? job.JobApplications.Select(b => new JobApplicationDto
                {
                    ApplicationID = b.ApplicationID,
                    UserID = b.UserID,
                    Fullname = b.Fullname,
                    Email = b.Email,
                    Phone = b.Phone,
                    CurrentJob = b.CurrentJob,
                    LinkedInLink = b.LinkedInLink,
                    PortfolioLink = b.PortfolioLink,
                    AdditionalInformation = b.AdditionalInformation,
                    ResumeFile = b.ResumeFile,
                    AppliedDate = b.AppliedDate,
                    Status = b.Status
                }).ToList() : new()
            }).ToList();

            return Ok(dtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var job = await _unitOfWork.JobListings.GetDetailedByIdAsync(id);
            if (job == null) return NotFound();

            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;


            var dto = new JobListingDto
            {
                JobID = job.JobID,
                UserID = job.UserID,
                Email = job.User.Email,
                Fullname = job.User.Fullname,
                Title = job.Title,
                Company = job.Company,
                City = job.City,
                Country = job.Country,
                Type = job.Type,
                Description = job.Description,
                Responsibilities = job.Responsibilities,
                WhoYouAre = job.WhoYouAre,
                NiceToHaves = job.NiceToHaves,
                Capacity = job.Capacity,
                ApplicationSent = job.JobApplications.Count(),
                ApplyBefore = job.ApplyBefore,
                JobPostedOn = job.JobPostedOn,
                SalaryFrom = job.SalaryFrom,
                SalaryTo = job.SalaryTo,
                CompanyWebsite = job.CompanyWebsite,
                Keywords = job.Keywords,
                AdditionalInformation = job.AdditionalInformation,
                CompanyPapers = job.CompanyPapers,
                Categories = job.JobListingCategories.Select(c => c.JobCategory.Name).ToList(),
                Skills = job.JobListingSkills.Select(s => s.Skill.Name).ToList(),
                JobBenefits = job.JobBenefits.Select(b => new JobBenefitDto
                {
                    Title = b.Title,
                    Description = b.Description,
                }).ToList(),
                JobApplications = user.UserID == job.UserID ? job.JobApplications.Select(b => new JobApplicationDto
                {
                    ApplicationID = b.ApplicationID,
                    UserID = b.UserID,
                    Fullname = b.Fullname,
                    Email = b.Email,
                    Phone = b.Phone,
                    CurrentJob = b.CurrentJob,
                    LinkedInLink = b.LinkedInLink,
                    PortfolioLink = b.PortfolioLink,
                    AdditionalInformation = b.AdditionalInformation,
                    ResumeFile = b.ResumeFile,
                    AppliedDate = b.AppliedDate,
                    Status = b.Status
                }).ToList() : new()

            };
            return Ok(dto);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(string keyword, string? country, string? city)
        {
            if (string.IsNullOrWhiteSpace(keyword)) return BadRequest("Keyword is required.");
            var jobs = await _unitOfWork.JobListings.SearchAsync(keyword, country, city);

            var dtos = jobs.Select(job => new JobListingDto
            {
                JobID = job.JobID,
                UserID = job.UserID,
                Email = job.User.Email,
                Fullname = job.User.Fullname,
                Title = job.Title,
                Company = job.Company,
                City = job.City,
                Country = job.Country,
                Type = job.Type,
                Description = job.Description,
                Responsibilities = job.Responsibilities,
                WhoYouAre = job.WhoYouAre,
                NiceToHaves = job.NiceToHaves,
                Capacity = job.Capacity,
                ApplicationSent = job.JobApplications.Count(),
                ApplyBefore = job.ApplyBefore,
                JobPostedOn = job.JobPostedOn,
                SalaryFrom = job.SalaryFrom,
                SalaryTo = job.SalaryTo,
                CompanyWebsite = job.CompanyWebsite,
                Keywords = job.Keywords,
                AdditionalInformation = job.AdditionalInformation,
                CompanyPapers = job.CompanyPapers,
                Categories = job.JobListingCategories.Select(c => c.JobCategory.Name).ToList(),
                Skills = job.JobListingSkills.Select(s => s.Skill.Name).ToList(),
                JobBenefits = job.JobBenefits.Select(b => new JobBenefitDto
                {
                    Title = b.Title,
                    Description = b.Description,
                }).ToList()
            }).ToList();

            return Ok(dtos);
        }

        [HttpPost]
        public async Task<IActionResult> Add(CreateJobListingDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            // Check if the current date is after the ApplyBefore date
            if (DateTime.UtcNow > dto.ApplyBefore)
            {
                return BadRequest("The application deadline has passed.");
            }

            var job = new JobListing
            {
                UserID = user.UserID,
                Title = dto.Title,
                Company = dto.Company,
                City = dto.City,
                Country = dto.Country,
                Type = dto.Type,
                Description = dto.Description,
                ApplyBefore = dto.ApplyBefore,
                SalaryFrom = dto.SalaryFrom,
                SalaryTo = dto.SalaryTo,
                JobPostedOn = DateTime.UtcNow
            };


            var benefits = dto.JobBenefits?.Select(b => new JobBenefit { Title = b.Title, Description = b.Description }).ToList() ?? new();

            await _unitOfWork.JobListings.AddAsync(job, dto.Categories ?? new(), dto.Skills ?? new(), benefits);


            var addedJob = new JobListingDto
            {
                JobID = job.JobID,
                UserID = job.UserID,
                Email = job.User.Email,
                Fullname = job.User.Fullname,
                Title = job.Title,
                Company = job.Company,
                City = job.City,
                Country = job.Country,
                Type = job.Type,
                Description = job.Description,
                Responsibilities = job.Responsibilities,
                WhoYouAre = job.WhoYouAre,
                NiceToHaves = job.NiceToHaves,
                Capacity = job.Capacity,
                ApplicationSent = job.JobApplications.Count(),
                ApplyBefore = job.ApplyBefore,
                JobPostedOn = job.JobPostedOn,
                SalaryFrom = job.SalaryFrom,
                SalaryTo = job.SalaryTo,
                CompanyWebsite = job.CompanyWebsite,
                Keywords = job.Keywords,
                AdditionalInformation = job.AdditionalInformation,
                CompanyPapers = job.CompanyPapers,
                Categories = job.JobListingCategories.Select(c => c.JobCategory.Name).ToList(),
                Skills = job.JobListingSkills.Select(s => s.Skill.Name).ToList(),
                JobBenefits = job.JobBenefits.Select(b => new JobBenefitDto
                {
                    Title = b.Title,
                    Description = b.Description,
                }).ToList()
            };

            return Ok(new { Success = true, message = "Job added successfully", addedJob });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, EditJobListingDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            var job = await _unitOfWork.JobListings.GetDetailedByIdAsync(id);
            if (job == null || job.UserID != user.UserID)
                return NotFound("Job not found or access denied");

            // Update main properties
            job.Title = dto.Title;
            job.Company = dto.Company;
            job.City = dto.City;
            job.Country = dto.Country;
            job.Type = dto.Type;
            job.Description = dto.Description;
            job.Responsibilities = dto.Responsibilities;
            job.WhoYouAre = dto.WhoYouAre;
            job.NiceToHaves = dto.NiceToHaves;
            job.Capacity = dto.Capacity;
            job.ApplyBefore = dto.ApplyBefore;
            job.SalaryFrom = dto.SalaryFrom;
            job.SalaryTo = dto.SalaryTo;
            job.CompanyWebsite = dto.CompanyWebsite;
            job.Keywords = dto.Keywords;
            job.AdditionalInformation = dto.AdditionalInformation;
            job.CompanyPapers = dto.CompanyPapers;

            // Update categories, skills, benefits (assumes repository handles relation updates)
            var updatedBenefits = dto.JobBenefits?.Select(b => new JobBenefit { Title = b.Title, Description = b.Description }).ToList() ?? new();
            await _unitOfWork.JobListings.UpdateAsync(job, dto.Categories ?? new(), dto.Skills ?? new(), updatedBenefits);

            // Prepare response DTO
            var updatedJob = new JobListingDto
            {
                JobID = job.JobID,
                UserID = job.UserID,
                Email = job.User.Email,
                Fullname = job.User.Fullname,
                Title = job.Title,
                Company = job.Company,
                City = job.City,
                Country = job.Country,
                Type = job.Type,
                Description = job.Description,
                Responsibilities = job.Responsibilities,
                WhoYouAre = job.WhoYouAre,
                NiceToHaves = job.NiceToHaves,
                Capacity = job.Capacity,
                ApplicationSent = job.JobApplications?.Count() ?? 0,
                ApplyBefore = job.ApplyBefore,
                JobPostedOn = job.JobPostedOn,
                SalaryFrom = job.SalaryFrom,
                SalaryTo = job.SalaryTo,
                CompanyWebsite = job.CompanyWebsite,
                Keywords = job.Keywords,
                AdditionalInformation = job.AdditionalInformation,
                CompanyPapers = job.CompanyPapers,
                Categories = job.JobListingCategories.Select(c => c.JobCategory.Name).ToList(),
                Skills = job.JobListingSkills.Select(s => s.Skill.Name).ToList(),
                JobBenefits = job.JobBenefits.Select(b => new JobBenefitDto
                {
                    Title = b.Title,
                    Description = b.Description
                }).ToList()
            };

            return Ok(new { Success = true, message = "Job updated successfully", updatedJob });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var job = await _unitOfWork.JobListings.GetDetailedByIdAsync(id);
            if (job == null) return NotFound();

            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            if (job.UserID != user.UserID)
                return NotFound("Job not found or access denied");

            _unitOfWork.JobListings.Delete(job);
            await _unitOfWork.SaveAsync();

            return Ok(new { Success = true, message = "Job removed successfully" });
        }

        [AllowAnonymous]
        [HttpGet("categories-job-count")]
        public async Task<IActionResult> GetCategoriesWithJobCounts()
        {
            var counts = await _unitOfWork.JobListings.GetCategoryJobCountsAsync();
            return Ok(counts);
        }
    }

}
