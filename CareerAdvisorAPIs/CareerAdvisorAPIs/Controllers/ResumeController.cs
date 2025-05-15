using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Text.Json;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using CareerAdvisorAPIs.DTOs.Resume;
using CareerAdvisorAPIs.Services;
using Microsoft.AspNetCore.StaticFiles;
using CareerAdvisorAPIs.DTOs.JobListing;
using Newtonsoft.Json;

namespace CareerAdvisorAPIs.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/Resume")]
    public class ResumeController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IResumeAIModelService _resumeAIModelService;

        public ResumeController(IUnitOfWork unitOfWork, IResumeAIModelService resumeAIModelService)
        {
            _unitOfWork = unitOfWork;
            _resumeAIModelService = resumeAIModelService;
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

            var items = await _unitOfWork.Resumes.GetAllResumesByUserId(user.UserID);
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            var resume = await _unitOfWork.Resumes.GetResumeWithFeedback(id);
            if (resume == null || resume.UserID != user.UserID) return NotFound("Resume not found or access denied");
            return Ok(resume);
        }

        [HttpPost]
        public async Task<IActionResult> Add(ResumeDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            // Step 1: Create basic resume entry
            var resume = new Resume
            {
                UserID = user.UserID,
                FileName = dto.FileName,
                JobDescription = dto.JobDescription,
                Date = DateTime.UtcNow,
                File = ""
            };

            await _unitOfWork.Resumes.AddAsync(resume);
            await _unitOfWork.SaveAsync();

            // Step 2: Save file to disk
            var filePath = await FileService.SaveFile($"Resume/{resume.ResumeID}/files", dto.File);
            resume.File = filePath;

            // Step 3: Call FastAPI scoring endpoint
            ResumeAIResponseDto? aiFeedback = await _resumeAIModelService.PostResumeAsync(new ResumeAIRequestDto { filePath = filePath, jobDescription = dto.JobDescription });

            if (aiFeedback == null)
            {
                return StatusCode(500, "Failed to generate AI feedback.");
            }

            // Step 4: Save feedback to DB
            var feedback = new ResumeFeedback
            {
                FeedbackText = aiFeedback.Feedback,
                Score = aiFeedback.Score,
                WeightsJson = "{}"
            };

            await _unitOfWork.ResumeFeedbacks.AddAsync(feedback);
            resume.ResumeFeedback = feedback;

            await _unitOfWork.SaveAsync();

            // Step 5: Return response
            return Ok(new ResumeResponseDto
            {
                ResumeID = resume.ResumeID,
                FileName = resume.FileName,
                File = resume.File,
                Date = resume.Date,
                JobDescription = resume.JobDescription,
                FeedbackText = feedback.FeedbackText,
                Score = feedback.Score
            });
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var resume = await _unitOfWork.Resumes.GetByIdAsync(id);
            if (resume == null) return NotFound();

            _unitOfWork.Resumes.Delete(resume);
            await _unitOfWork.SaveAsync();
            return Ok("Deleted successfully.");
        }

        [HttpGet("{resumeID}/files/{filename}")]
        public async Task<IActionResult> GetResumeFile(int resumeID, string filename)
        {
            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            var resume = await _unitOfWork.Resumes.GetByIdAsync(resumeID);
            if (resume == null || resume.UserID != user.UserID) return NotFound("Resume not found or access denied");

            var filePath = $"Resume/{resumeID}/files/{filename}";

            var fullDirPath = Path.Combine(FileService.imageDirectory, filePath);

            if (!System.IO.File.Exists(fullDirPath))
                return NotFound("File not found.");

            var mimeTypeProvider = new FileExtensionContentTypeProvider();
            if (!mimeTypeProvider.TryGetContentType(filename, out var mimeType))
            {
                // Default MIME type if the extension is not recognized
                mimeType = "application/octet-stream";
            }

            return PhysicalFile(fullDirPath, mimeType);
        }
    }
}