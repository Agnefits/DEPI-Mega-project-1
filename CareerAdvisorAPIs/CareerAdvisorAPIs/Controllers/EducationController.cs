using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using CareerAdvisorAPIs.DTOs.Education;
using CareerAdvisorAPIs.Services;

namespace CareerAdvisorAPIs.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/Education")]
    public class EducationController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public EducationController(IUnitOfWork unitOfWork)
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
            if(id != null)
            {
                var userItems = await _unitOfWork.Educations.GetAllByProfileIdAsync(id.Value);
                if (userItems == null)
                    return NotFound("Profile not found");
                return Ok(userItems);
            }

            var (profile, error) = await GetUserProfileAsync();
            if (error != null) return error;

            var items = await _unitOfWork.Educations.GetAllByProfileIdAsync(profile.ProfileID);
            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> Add(EducationDto addEducation)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid fields");

            var (profile, error) = await GetUserProfileAsync();
            if (error != null) return error;

            var education = new Education
            {
                ProfileID = profile.ProfileID,
                University = addEducation.University,
                Degree = addEducation.Degree,
                DateFrom = addEducation.DateFrom,
                DateTo = addEducation.DateTo,
                Description = addEducation.Description
            };

            await _unitOfWork.Educations.AddAsync(education);
            await _unitOfWork.SaveAsync();

            return Ok(new
            {
                Success = true,
                Message = "Education added",
                Education = new EducationResponseDto
                {
                    EducationID = education.EducationID,
                    University = education.University,
                    Degree = education.Degree,
                    DateFrom = education.DateFrom,
                    DateTo = education.DateTo,
                    Description = education.Description
                }
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, EducationDto editEducation)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid fields");

            var (profile, error) = await GetUserProfileAsync();
            if (error != null) return error;

            var education = await _unitOfWork.Educations.GetByIdAsync(id);
            if (education == null || education.ProfileID != profile.ProfileID)
                return NotFound("Education not found");

            education.University = editEducation.University;
            education.Degree = editEducation.Degree;
            education.DateFrom = editEducation.DateFrom;
            education.DateTo = editEducation.DateTo;
            education.Description = editEducation.Description;

            _unitOfWork.Educations.Update(education);
            await _unitOfWork.SaveAsync();

            return Ok(new
            {
                Success = true,
                Message = "Education updated",
                Education = new EducationResponseDto
                {
                    EducationID = education.EducationID,
                    University = education.University,
                    Degree = education.Degree,
                    DateFrom = education.DateFrom,
                    DateTo = education.DateTo,
                    Description = education.Description
                }
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var (profile, error) = await GetUserProfileAsync();
            if (error != null) return error;

            var item = await _unitOfWork.Educations.GetByIdAsync(id);
            if (item == null || item.ProfileID != profile.ProfileID)
                return NotFound("Education not found");

            _unitOfWork.Educations.Delete(item);
            await _unitOfWork.SaveAsync();

            return Ok(new { Success = true, Message = "Education deleted" });
        }
    }
}
