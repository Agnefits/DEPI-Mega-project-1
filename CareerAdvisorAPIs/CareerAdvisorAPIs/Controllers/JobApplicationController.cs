using CareerAdvisorAPIs.DTOs.JobApplication;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using CareerAdvisorAPIs.DTOs.JobListing;
using static System.Net.Mime.MediaTypeNames;
using CareerAdvisorAPIs.Services;
using Microsoft.AspNetCore.StaticFiles;

namespace CareerAdvisorAPIs.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/JobApplication")]
    public class JobApplicationController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public JobApplicationController(IUnitOfWork unitOfWork)
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
            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            var applications = await _unitOfWork.JobApplications.GetByUserIdAsync(user.UserID);

            var dtos = applications.Select(application => new JobApplicationDto
            {
                ApplicationID = application.ApplicationID,
                UserID = application.UserID,
                Fullname = application.Fullname,
                Email = application.Email,
                Phone = application.Phone,
                CurrentJob = application.CurrentJob,
                LinkedInLink = application.LinkedInLink,
                PortfolioLink = application.PortfolioLink,
                AdditionalInformation = application.AdditionalInformation,
                ResumeFile = application.ResumeFile,
                AppliedDate = application.AppliedDate,
                Status = application.Status,
                JobListing = new JobListingDto
                {
                    JobID = application.JobListing.JobID,
                    UserID = application.JobListing.UserID,
                    Email = application.JobListing.User.Email,
                    Fullname = application.JobListing.User.Fullname,
                    Title = application.JobListing.Title,
                    Company = application.JobListing.Company,
                    City = application.JobListing.City,
                    Country = application.JobListing.Country,
                    Type = application.JobListing.Type,
                    Description = application.JobListing.Description,
                    Responsibilities = application.JobListing.Responsibilities,
                    WhoYouAre = application.JobListing.WhoYouAre,
                    NiceToHaves = application.JobListing.NiceToHaves,
                    Capacity = application.JobListing.Capacity,
                    ApplicationSent = application.JobListing.JobApplications?.Count() ?? 0,
                    ApplyBefore = application.JobListing.ApplyBefore,
                    JobPostedOn = application.JobListing.JobPostedOn,
                    SalaryFrom = application.JobListing.SalaryFrom,
                    SalaryTo = application.JobListing.SalaryTo,
                    CompanyWebsite = application.JobListing.CompanyWebsite,
                    Keywords = application.JobListing.Keywords,
                    AdditionalInformation = application.JobListing.AdditionalInformation,
                    CompanyPapers = application.JobListing.CompanyPapers,
                    Categories = application.JobListing.JobListingCategories.Select(c => c.JobCategory.Name).ToList(),
                    Skills = application.JobListing.JobListingSkills.Select(s => s.Skill.Name).ToList(),
                    JobBenefits = application.JobListing.JobBenefits.Select(b => new JobBenefitDto
                    {
                        Title = b.Title,
                        Description = b.Description
                    }).ToList()
                }
            }).ToList();

            return Ok(dtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            var application = await _unitOfWork.JobApplications.GetDetailedByIdAsync(id);

            if (application.UserID != user.UserID || application.JobListing.UserID != user.UserID)
                return NotFound("Application not found or access denied");

            var dto = new JobApplicationDto
            {
                ApplicationID = application.ApplicationID,
                UserID = application.UserID,
                Fullname = application.Fullname,
                Email = application.Email,
                Phone = application.Phone,
                CurrentJob = application.CurrentJob,
                LinkedInLink = application.LinkedInLink,
                PortfolioLink = application.PortfolioLink,
                AdditionalInformation = application.AdditionalInformation,
                ResumeFile = application.ResumeFile,
                AppliedDate = application.AppliedDate,
                Status = application.Status,
                JobListing = new JobListingDto
                {
                    JobID = application.JobListing.JobID,
                    UserID = application.JobListing.UserID,
                    Email = application.JobListing.User.Email,
                    Fullname = application.JobListing.User.Fullname,
                    Title = application.JobListing.Title,
                    Company = application.JobListing.Company,
                    City = application.JobListing.City,
                    Country = application.JobListing.Country,
                    Type = application.JobListing.Type,
                    Description = application.JobListing.Description,
                    Responsibilities = application.JobListing.Responsibilities,
                    WhoYouAre = application.JobListing.WhoYouAre,
                    NiceToHaves = application.JobListing.NiceToHaves,
                    Capacity = application.JobListing.Capacity,
                    ApplicationSent = application.JobListing.JobApplications?.Count() ?? 0,
                    ApplyBefore = application.JobListing.ApplyBefore,
                    JobPostedOn = application.JobListing.JobPostedOn,
                    SalaryFrom = application.JobListing.SalaryFrom,
                    SalaryTo = application.JobListing.SalaryTo,
                    CompanyWebsite = application.JobListing.CompanyWebsite,
                    Keywords = application.JobListing.Keywords,
                    AdditionalInformation = application.JobListing.AdditionalInformation,
                    CompanyPapers = application.JobListing.CompanyPapers,
                    Categories = application.JobListing.JobListingCategories.Select(c => c.JobCategory.Name).ToList(),
                    Skills = application.JobListing.JobListingSkills.Select(s => s.Skill.Name).ToList(),
                    JobBenefits = application.JobListing.JobBenefits.Select(b => new JobBenefitDto
                    {
                        Title = b.Title,
                        Description = b.Description
                    }).ToList()
                }
            };

            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateJobApplicationDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            var jobListing = await _unitOfWork.JobListings.GetDetailedByIdAsync(dto.JobID);
            if (jobListing == null)
                return NotFound("Job listing not found.");

            // Check if the user is the owner of the job listing (to prevent self-application)
            if (jobListing.UserID == user.UserID)
            {
                return BadRequest("You cannot apply for your own job listing.");
            }
            // Check if the current date is after the ApplyBefore date
            else if (DateTime.UtcNow > jobListing.ApplyBefore)
            {
                return BadRequest("The application deadline has passed.");
            }
            // Check if the job listing has reached its capacity (max number of applications)
            else if (jobListing.Capacity <= jobListing.JobApplications.Count())
            {
                return BadRequest("The maximum number of applications for this job has been reached.");
            }
            // Check if the user has already applied for the job (duplicate applications)
            else if (jobListing.JobApplications.Any(application => application.UserID == user.UserID))
            {
                return BadRequest("You have already applied for this job.");
            }


            // Create Job Application entity
            var jobApplication = new JobApplication
            {
                UserID = user.UserID,
                JobID = dto.JobID,
                Fullname = dto.Fullname,
                Email = dto.Email,
                Phone = dto.Phone,
                CurrentJob = dto.CurrentJob,
                LinkedInLink = dto.LinkedInLink,
                PortfolioLink = dto.PortfolioLink,
                AdditionalInformation = dto.AdditionalInformation,
                AppliedDate = DateTime.UtcNow,
                Status = "Pending",
            };

            await _unitOfWork.JobApplications.AddAsync(jobApplication);
            await _unitOfWork.SaveAsync();

            // Handle file upload for Resume file
            if (dto.ResumeFile != null)
            {
                var filePath = await FileService.SaveFile($"Application/{jobApplication.ApplicationID}/files", dto.ResumeFile);
                jobApplication.ResumeFile = filePath; // Save the file path in the database
            }

            var addedApplication = new JobApplicationDto
            {
                ApplicationID = jobApplication.ApplicationID,
                UserID = jobApplication.UserID,
                Fullname = jobApplication.Fullname,
                Email = jobApplication.Email,
                Phone = jobApplication.Phone,
                CurrentJob = jobApplication.CurrentJob,
                LinkedInLink = jobApplication.LinkedInLink,
                PortfolioLink = jobApplication.PortfolioLink,
                AdditionalInformation = jobApplication.AdditionalInformation,
                ResumeFile = jobApplication.ResumeFile,
                AppliedDate = jobApplication.AppliedDate,
                Status = jobApplication.Status,
                JobListing = new JobListingDto
                {
                    JobID = jobApplication.JobListing.JobID,
                    UserID = jobApplication.JobListing.UserID,
                    Email = jobApplication.JobListing.User.Email,
                    Fullname = jobApplication.JobListing.User.Fullname,
                    Title = jobApplication.JobListing.Title,
                    Company = jobApplication.JobListing.Company,
                    City = jobApplication.JobListing.City,
                    Country = jobApplication.JobListing.Country,
                    Type = jobApplication.JobListing.Type,
                    Description = jobApplication.JobListing.Description,
                    Responsibilities = jobApplication.JobListing.Responsibilities,
                    WhoYouAre = jobApplication.JobListing.WhoYouAre,
                    NiceToHaves = jobApplication.JobListing.NiceToHaves,
                    Capacity = jobApplication.JobListing.Capacity,
                    ApplicationSent = jobApplication.JobListing.JobApplications?.Count() ?? 0,
                    ApplyBefore = jobApplication.JobListing.ApplyBefore,
                    JobPostedOn = jobApplication.JobListing.JobPostedOn,
                    SalaryFrom = jobApplication.JobListing.SalaryFrom,
                    SalaryTo = jobApplication.JobListing.SalaryTo,
                    CompanyWebsite = jobApplication.JobListing.CompanyWebsite,
                    Keywords = jobApplication.JobListing.Keywords,
                    AdditionalInformation = jobApplication.JobListing.AdditionalInformation,
                    CompanyPapers = jobApplication.JobListing.CompanyPapers,
                    Categories = jobApplication.JobListing.JobListingCategories.Select(c => c.JobCategory.Name).ToList(),
                    Skills = jobApplication.JobListing.JobListingSkills.Select(s => s.Skill.Name).ToList(),
                    JobBenefits = jobApplication.JobListing.JobBenefits.Select(b => new JobBenefitDto
                    {
                        Title = b.Title,
                        Description = b.Description
                    }).ToList()
                }
            };

            return Ok(new { Success = true, message = "Application added successfully", addedApplication });
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> ChangeStatus(int id, string status)
        {
            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            var application = await _unitOfWork.JobApplications.GetDetailedByIdAsync(id);

            if (application.JobListing.UserID != user.UserID)
                return NotFound("Application not found or access denied");

            application.Status = status;

            await _unitOfWork.SaveAsync();

            var dto = new JobApplicationDto
            {
                ApplicationID = application.ApplicationID,
                UserID = application.UserID,
                Fullname = application.Fullname,
                Email = application.Email,
                Phone = application.Phone,
                CurrentJob = application.CurrentJob,
                LinkedInLink = application.LinkedInLink,
                PortfolioLink = application.PortfolioLink,
                AdditionalInformation = application.AdditionalInformation,
                ResumeFile = application.ResumeFile,
                AppliedDate = application.AppliedDate,
                Status = application.Status,
                JobListing = new JobListingDto
                {
                    JobID = application.JobListing.JobID,
                    UserID = application.JobListing.UserID,
                    Email = application.JobListing.User.Email,
                    Fullname = application.JobListing.User.Fullname,
                    Title = application.JobListing.Title,
                    Company = application.JobListing.Company,
                    City = application.JobListing.City,
                    Country = application.JobListing.Country,
                    Type = application.JobListing.Type,
                    Description = application.JobListing.Description,
                    Responsibilities = application.JobListing.Responsibilities,
                    WhoYouAre = application.JobListing.WhoYouAre,
                    NiceToHaves = application.JobListing.NiceToHaves,
                    Capacity = application.JobListing.Capacity,
                    ApplicationSent = application.JobListing.JobApplications?.Count() ?? 0,
                    ApplyBefore = application.JobListing.ApplyBefore,
                    JobPostedOn = application.JobListing.JobPostedOn,
                    SalaryFrom = application.JobListing.SalaryFrom,
                    SalaryTo = application.JobListing.SalaryTo,
                    CompanyWebsite = application.JobListing.CompanyWebsite,
                    Keywords = application.JobListing.Keywords,
                    AdditionalInformation = application.JobListing.AdditionalInformation,
                    CompanyPapers = application.JobListing.CompanyPapers,
                    Categories = application.JobListing.JobListingCategories.Select(c => c.JobCategory.Name).ToList(),
                    Skills = application.JobListing.JobListingSkills.Select(s => s.Skill.Name).ToList(),
                    JobBenefits = application.JobListing.JobBenefits.Select(b => new JobBenefitDto
                    {
                        Title = b.Title,
                        Description = b.Description
                    }).ToList()
                }
            };

            return Ok(new { Success = true, message = "Application status changed successfully", dto });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var application = await _unitOfWork.JobApplications.GetDetailedByIdAsync(id);
            if (application == null) return NotFound();

            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            if (application.UserID != user.UserID)
                return NotFound("Application not found or access denied");

            if (!string.IsNullOrEmpty(application.ResumeFile))
            {
                FileService.DeleteFile(application.ResumeFile);
                application.ResumeFile = null;
            }

            _unitOfWork.JobApplications.Delete(application);
            await _unitOfWork.SaveAsync();

            return Ok(new { Success = true, message = "Application removed successfully" });
        }


        [HttpGet("{applicationID}/files/{fileName}")]
        public async Task<IActionResult> GetResumeFile(int applicationID, string fileName)
        {
            var filePath = $"Application/{applicationID}/files/{fileName}";

            var fullDirPath = Path.Combine(FileService.imageDirectory, filePath);

            if (!System.IO.File.Exists(fullDirPath))
                return NotFound("File not found.");

            var mimeTypeProvider = new FileExtensionContentTypeProvider();
            if (!mimeTypeProvider.TryGetContentType(fileName, out var mimeType))
            {
                // Default MIME type if the extension is not recognized
                mimeType = "application/octet-stream";
            }

            return PhysicalFile(fullDirPath, mimeType);
        }
    }
}
