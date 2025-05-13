using CareerAdvisorAPIs.DTOs.Profile;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using CareerAdvisorAPIs.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Security.Claims;

namespace CareerAdvisorAPIs.Controllers
{
    [Route("api/Profile")]
    [ApiController]
    [Authorize]
    public partial class ProfileController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJobAIModelService _jobAIModelService;

        public ProfileController(IUnitOfWork unitOfWork, IJobAIModelService jobAIModelService)
        {
            _unitOfWork = unitOfWork;
            _jobAIModelService = jobAIModelService;
        }

        // Helper method to get user + profile
        private async Task<(User user, Profile profile, IActionResult errorResult)> GetAuthenticatedUserAndProfileAsync()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return (null, null, Unauthorized("Unauthorized user"));

            var user = await _unitOfWork.Users.GetByIdAsync(int.Parse(userId));
            if (user == null)
                return (null, null, NotFound("User not found"));

            var profile = await _unitOfWork.Profiles.GetByUserIdAsync(int.Parse(userId));
            // Some actions add the profile if it not exist
            /*if (profile == null)
                return (null, null, NotFound("Profile not found"));*/

            return (user, profile, null);
        }


        [HttpGet("{id}")]
        [HttpGet]
        [HttpGet("me")]
        public async Task<IActionResult> GetProfile(int? id)
        {
            if (id != null)
            {
                var userProfile = await _unitOfWork.Profiles.GetByIdAsync(id.Value);
                if (userProfile == null)
                    return NotFound("Profile not found");
                return Ok(new ProfileResponseDto(userProfile));
            }

            var (user, profile, errorResult) = await GetAuthenticatedUserAndProfileAsync();
            if (errorResult != null) return errorResult;

            if (profile == null)
            {
                // If profile doesn't exist, create one
                profile = new Profile { UserID = user.UserID };
                await _unitOfWork.Profiles.AddAsync(profile);
                await _unitOfWork.SaveAsync();
            }

            return Ok(new ProfileResponseDto(profile));
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> EditProfile(EditProfileDto editProfile)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var (user, profile, errorResult) = await GetAuthenticatedUserAndProfileAsync();
            if (errorResult != null) return errorResult;

            if (profile == null)
            {
                // If profile doesn't exist, create one
                profile = new Profile { UserID = user.UserID };
                await _unitOfWork.Profiles.AddAsync(profile);
                await _unitOfWork.SaveAsync();
            }

            // Update profile fields
            profile.JobTitle = editProfile.JobTitle;
            profile.AboutMe = editProfile.AboutMe;
            profile.Phone = editProfile.Phone;
            profile.Gender = editProfile.Gender;
            profile.Type = editProfile.Type;

            // Delete profile image
            if ((editProfile.DeleteImage ?? false) && !string.IsNullOrEmpty(profile.Image))
            {
                FileService.DeleteFile(profile.Image);
                profile.Image = null;
            }

            // Delete profile cover image
            if ((editProfile.DeleteCoverImage ?? false) && !string.IsNullOrEmpty(profile.CoverImage))
            {
                FileService.DeleteFile(profile.CoverImage);
                profile.CoverImage = null;
            }

            // Handle image upload for profile picture
            if (editProfile.Image != null)
            {
                // Delete old image if exists
                if (!string.IsNullOrEmpty(profile.Image))
                {
                    FileService.DeleteFile(profile.Image);
                }

                var imagePath = await FileService.SaveFile($"profile/{profile.ProfileID}/images", editProfile.Image);
                profile.Image = imagePath; // Save the file path in the database
            }

            // Handle image upload for cover image
            if (editProfile.CoverImage != null)
            {
                // Delete old image if exists
                if (!string.IsNullOrEmpty(profile.CoverImage))
                {
                    FileService.DeleteFile(profile.CoverImage);
                }

                var coverImagePath = await FileService.SaveFile($"profile/{profile.ProfileID}/images", editProfile.CoverImage);
                profile.CoverImage = coverImagePath; // Save the file path in the database
            }

            // Save changes
            await _unitOfWork.SaveAsync();
            return Ok(new ProfileResponseDto(profile));
        }

        [AllowAnonymous]
        [HttpGet("{profileID}/images/{imageName}")]
        public async Task<IActionResult> GetProfileImage(int profileID, string imageName)
        {
            var filePath = $"profile/{profileID}/images/{imageName}";

            var fullDirPath = Path.Combine(FileService.imageDirectory, filePath);

            if (!System.IO.File.Exists(fullDirPath))
                return NotFound("Image not found.");

            var mimeType = "image/" + Path.GetExtension(imageName).TrimStart('.'); // basic mime type
            return PhysicalFile(fullDirPath, mimeType);
        }
    }
}
