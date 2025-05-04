using CareerAdvisorAPIs.DTOs.JobListing;
using CareerAdvisorAPIs.DTOs.Portfolio;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Services;
using Microsoft.AspNetCore.Mvc;

namespace CareerAdvisorAPIs.Controllers
{
    public partial class JobListingController
    {
        [HttpGet("saved")]
        public async Task<IActionResult> GetSavedJobListings()
        {
            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            var savedJobs = await _unitOfWork.SavedJobs.GetSavedJobs(user.UserID);

            var jobs = savedJobs.Select(job => new JobListingDto
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
            return Ok(jobs);
        }

        [HttpPost("saved")]
        public async Task<IActionResult> AddSavedJobListing(int jobId)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            // Check if the job exists in the JobListings table
            var job = await _unitOfWork.JobListings.GetByIdAsync(jobId);
            if (job == null)
                return BadRequest("Job is not exist");

            // Check if the user already has this saved job
            var existingSavedJob = await _unitOfWork.SavedJobs.GetByProfileAndJobIdAsync(user.UserID, jobId);
            if (existingSavedJob != null)
                return BadRequest("User already has this saved job");

            var savedJob = new SavedJob
            {
                UserID = user.UserID,
                JobID = jobId,
                Date = DateTime.UtcNow
            };

            await _unitOfWork.SavedJobs.AddAsync(savedJob);
            await _unitOfWork.SaveAsync();

            return Ok(new
            {
                Success = true,
                Message = "Job Saved"
            });
        }

        [HttpDelete("saved/{id}")]
        public async Task<IActionResult> DeleteSavedJobListing(int id)
        {
            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            // Check if the user already has this saved job
            var deleted = await _unitOfWork.SavedJobs.Delete(user.UserID, id);
            if (!deleted)
                return BadRequest("User doesn't has this saved job");

            await _unitOfWork.SaveAsync();
            return Ok(new { Success = true, Message = "Deleted successfully" });
        }

    }
}
