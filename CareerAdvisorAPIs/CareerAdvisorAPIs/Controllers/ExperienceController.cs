using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using CareerAdvisorAPIs.DTOs.Experience;

namespace CareerAdvisorAPIs.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/Experience")]
    public class ExperienceController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ExperienceController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        private async Task<(Profile profile, IActionResult errorResult)> GetUserProfileAsync()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return (null, Unauthorized("Unauthorized user"));

            var profile = await _unitOfWork.Profiles.GetByUserIdAsync(int.Parse(userId));
            if (profile == null)
                return (null, NotFound("Profile not found"));

            return (profile, null);
        }

        [HttpGet("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetAll(int? id)
        {
            if (id != null)
            {
                var userItems = await _unitOfWork.Experiences.GetAllByProfileIdAsync(id.Value);
                if (userItems == null)
                    return NotFound("Profile not found");
                return Ok(userItems);
            }

            var (profile, error) = await GetUserProfileAsync();
            if (error != null) return error;

            var items = await _unitOfWork.Experiences.GetAllByProfileIdAsync(profile.ProfileID);
            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> Add(ExperienceDto addExperience)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid fields");

            var (profile, error) = await GetUserProfileAsync();
            if (error != null) return error;

            var experience = new Experience
            {
                ProfileID = profile.ProfileID,
                Title = addExperience.Title,
                Company = addExperience.Company,
                Type = addExperience.Type,
                DateFrom = addExperience.DateFrom,
                DateTo = addExperience.DateTo,
                City = addExperience.City,
                Country = addExperience.Country,
                Description = addExperience.Description
            };

            await _unitOfWork.Experiences.AddAsync(experience);
            await _unitOfWork.SaveAsync();

            return Ok(new
            {
                Success = true,
                Message = "Experience added",
                Experience = new ExperienceResponseDto
                {
                    ExperienceID = experience.ExperienceID,
                    Title = experience.Title,
                    Company = experience.Company,
                    Type = experience.Type,
                    DateFrom = experience.DateFrom,
                    DateTo = experience.DateTo,
                    City = experience.City,
                    Country = experience.Country,
                    Description = experience.Description
                }
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ExperienceDto editExperience)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid fields");

            var (profile, error) = await GetUserProfileAsync();
            if (error != null) return error;

            var experience = await _unitOfWork.Experiences.GetByIdAsync(id);
            if (experience == null || experience.ProfileID != profile.ProfileID)
                return NotFound("Experience not found");

            experience.Title = editExperience.Title;
            experience.Company = editExperience.Company;
            experience.Type = editExperience.Type;
            experience.DateFrom = editExperience.DateFrom;
            experience.DateTo = editExperience.DateTo;
            experience.City = editExperience.City;
            experience.Country = editExperience.Country;
            experience.Description = editExperience.Description;

            _unitOfWork.Experiences.Update(experience);
            await _unitOfWork.SaveAsync();

            return Ok(new
            {
                Success = true,
                Message = "Experience updated",
                Experience = new ExperienceResponseDto
                {
                    ExperienceID = experience.ExperienceID,
                    Title = experience.Title,
                    Company = experience.Company,
                    Type = experience.Type,
                    DateFrom = experience.DateFrom,
                    DateTo = experience.DateTo,
                    City = experience.City,
                    Country = experience.Country,
                    Description = experience.Description
                }
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var (profile, error) = await GetUserProfileAsync();
            if (error != null) return error;

            var item = await _unitOfWork.Experiences.GetByIdAsync(id);
            if (item == null || item.ProfileID != profile.ProfileID)
                return NotFound("Experience not found");

            _unitOfWork.Experiences.Delete(item);
            await _unitOfWork.SaveAsync();

            return Ok(new { Success = true, Message = "Experience deleted" });
        }
    }
}
