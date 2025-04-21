using CareerAdvisorAPIs.DTOs.Profile;
using CareerAdvisorAPIs.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CareerAdvisorAPIs.Controllers
{
    public partial class ProfileController : ControllerBase
    {
        [HttpPost("sociallink")]
        public async Task<IActionResult> AddSocialLink(SocialLinkDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var (user, profile, errorResult) = await GetAuthenticatedUserAndProfileAsync();
            if (errorResult != null) return errorResult;

            var link = new SocialLink
            {
                ProfileID = profile.ProfileID,
                Platform = dto.Platform,
                Link = dto.Link
            };

            await _unitOfWork.SocialLinks.AddAsync(link);
            await _unitOfWork.SaveAsync();

            return Ok(new { Success = true, message = "Social link added successfully", SocialLink = new SocialLinkResponseDto { LinkID = link.LinkID, Link = link.Link, Platform = link.Platform } });
        }

        [HttpPut("sociallink/{id}")]
        public async Task<IActionResult> EditSocialLink(int id, SocialLinkDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var (user, profile, errorResult) = await GetAuthenticatedUserAndProfileAsync();
            if (errorResult != null) return errorResult;

            var existingLink = await _unitOfWork.SocialLinks.GetByIdAsync(id);
            if (existingLink == null || existingLink.ProfileID != profile.ProfileID)
                return NotFound("Social link not found");

            existingLink.Platform = dto.Platform;
            existingLink.Link = dto.Link;

            _unitOfWork.SocialLinks.Update(existingLink);
            await _unitOfWork.SaveAsync();

            return Ok(new { Success = true, message = "Social link updated successfully", SocialLink = new SocialLinkResponseDto { LinkID = existingLink.LinkID, Link = existingLink.Link, Platform = existingLink.Platform } });
        }

        [HttpDelete("sociallink/{id}")]
        public async Task<IActionResult> DeleteSocialLink(int id)
        {
            var (user, profile, errorResult) = await GetAuthenticatedUserAndProfileAsync();
            if (errorResult != null) return errorResult;

            var link = await _unitOfWork.SocialLinks.GetByIdAsync(id);
            if (link == null || link.ProfileID != profile.ProfileID)
                return NotFound("Social link not found");

            _unitOfWork.SocialLinks.Delete(link);
            await _unitOfWork.SaveAsync();

            return Ok(new { Success = true, message = "Social link deleted successfully" });
        }
    }
}
