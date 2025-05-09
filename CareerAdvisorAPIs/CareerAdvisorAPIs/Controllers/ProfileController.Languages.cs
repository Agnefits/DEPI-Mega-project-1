using CareerAdvisorAPIs.DTOs.Profile;
using CareerAdvisorAPIs.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace CareerAdvisorAPIs.Controllers
{
    public partial class ProfileController
    {
        [HttpPost("language")]
        public async Task<IActionResult> AddLanguageToUser([MaxLength(50)] string languageName)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var (user, profile, errorResult) = await GetAuthenticatedUserAndProfileAsync();
            if (errorResult != null) return errorResult;

            if (profile == null)
                return NotFound("Profile not found");

            // Check if the language exists in the languages table
            var language = await _unitOfWork.Languages.GetByNameAsync(languageName);
            if (language == null)
            {
                // If the language does not exist, create it
                language = new Language { Name = languageName };
                await _unitOfWork.Languages.AddAsync(language);
                await _unitOfWork.SaveAsync();
            }

            // Check if the user already has this language
            var existingUserLanguage = await _unitOfWork.UserLanguages.GetByProfileAndLanguageIdAsync(profile.ProfileID, language.LanguageID);
            if (existingUserLanguage != null)
                return BadRequest("User already has this language");

            // Add the language to the user's profile
            var userLanguage = new UserLanguage
            {
                ProfileID = profile.ProfileID,
                LanguageID = language.LanguageID
            };

            await _unitOfWork.UserLanguages.AddAsync(userLanguage);
            await _unitOfWork.SaveAsync();

            return Ok(new LanguageResponseDto { Success = true, Message = "Language added successfully", LanguageName = languageName });
        }

        [HttpDelete("language")]
        public async Task<IActionResult> RemoveLanguageFromUser([MaxLength(50)] string languageName)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var (user, profile, errorResult) = await GetAuthenticatedUserAndProfileAsync();
            if (errorResult != null) return errorResult;

            if (profile == null)
                return NotFound("Profile not found");

            // Find the language by name
            var language = await _unitOfWork.Languages.GetByNameAsync(languageName);
            if (language == null)
                return NotFound("Language not found");

            // Remove the language from the user's profile
            bool deleted = await _unitOfWork.UserLanguages.Delete(profile.ProfileID, language.LanguageID);
            if (!deleted)
                return NotFound("User does not have this language");

            await _unitOfWork.SaveAsync();

            return Ok(new LanguageResponseDto { Success = true, Message = "Language removed successfully" });
        }
    }
}
