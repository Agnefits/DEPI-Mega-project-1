using CareerAdvisorAPIs.DTOs.JobListing;
using CareerAdvisorAPIs.DTOs.Profile;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace CareerAdvisorAPIs.Controllers
{
    public partial class ProfileController : ControllerBase
    {
        [HttpPost("skill")]
        public async Task<IActionResult> AddSkillToUser([MaxLength(100)] string skillName)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var (user, profile, errorResult) = await GetAuthenticatedUserAndProfileAsync();
            if (errorResult != null) return errorResult;

            if (profile == null)
                return NotFound("Profile not found");

            // Check if the skill exists in the Skills table
            var skill = await _unitOfWork.Skills.GetByNameAsync(skillName);
            if (skill == null)
            {
                // If the skill does not exist, create it
                skill = new Skill { Name = skillName };
                await _unitOfWork.Skills.AddAsync(skill);
                await _unitOfWork.SaveAsync();
            }

            // Check if the user already has this skill
            var existingUserSkill = await _unitOfWork.UserSkills.GetByProfileAndSkillIdAsync(profile.ProfileID, skill.SkillID);
            if (existingUserSkill != null)
                return BadRequest("User already has this skill");

            // Add the skill to the user's profile
            var userSkill = new UserSkill
            {
                ProfileID = profile.ProfileID,
                SkillID = skill.SkillID
            };

            // Send skills to AI Model
            var aiRequest = new UserAIRequestDto
            {
                user_id = user.UserID,
                skills = profile.UserSkills.Select(us => us.Skill.Name).ToList()
            };

            var aiModelResponse = await _jobAIModelService.PostUserAsync(aiRequest);
            if (aiModelResponse != null)
                profile.WeightsJson = JsonConvert.SerializeObject(aiModelResponse.embedding);

            await _unitOfWork.UserSkills.AddAsync(userSkill);
            await _unitOfWork.SaveAsync();

            return Ok(new SkillResponseDto { Success = true, Message = "Skill added successfully", SkillName =  skillName });
        }

        [HttpDelete("skill")]
        public async Task<IActionResult> RemoveSkillFromUser([MaxLength(100)] string skillName)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var (user, profile, errorResult) = await GetAuthenticatedUserAndProfileAsync();
            if (errorResult != null) return errorResult;

            if (profile == null)
                return NotFound("Profile not found");

            // Find the skill by name
            var skill = await _unitOfWork.Skills.GetByNameAsync(skillName);
            if (skill == null)
                return NotFound("Skill not found");

            // Remove the skill from the user's profile
            bool deleted = await _unitOfWork.UserSkills.Delete(profile.ProfileID, skill.SkillID);
            if (!deleted)
                return NotFound("User does not have this skill");

            // Send skills to AI Model
            var aiRequest = new UserAIRequestDto
            {
                user_id = user.UserID,
                skills = profile.UserSkills.Select(us => us.Skill.Name).ToList()
            };

            var aiModelResponse = await _jobAIModelService.PostUserAsync(aiRequest);
            if (aiModelResponse != null)
                profile.WeightsJson = JsonConvert.SerializeObject(aiModelResponse.embedding);

            await _unitOfWork.SaveAsync();

            return Ok(new SkillResponseDto { Success = true, Message = "Skill removed successfully" });
        }
    }
}
