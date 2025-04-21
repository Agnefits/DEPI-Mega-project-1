using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using CareerAdvisorAPIs.DTOs.Notification;
using Microsoft.AspNetCore.SignalR;
using CareerAdvisorAPIs.Hubs;
using Microsoft.EntityFrameworkCore;

namespace CareerAdvisorAPIs.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/Notification")]
    public class NotificationController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHubContext<NotificationHub> _hubContext;

        public NotificationController(IUnitOfWork unitOfWork, IHubContext<NotificationHub> hubContext)
        {
            _unitOfWork = unitOfWork;
            _hubContext = hubContext;
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
            if (profile == null)
                return (null, null, NotFound("Profile not found"));

            return (user, profile, null);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            var items = await _unitOfWork.Notifications.GetAllByProfileIdAsync(profile.ProfileID);
            return Ok(items);
        }

        [HttpGet("Settings")]
        public async Task<IActionResult> GetNotificationSetting()
        {
            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            var setting = await _unitOfWork.NotificationSettings.GetByUserIdAsync(user.UserID);

            if (setting == null)
            {
                setting = new NotificationSetting
                {
                    UserID = user.UserID,
                    ApplicationsOn = true,
                    JobsOn = true,
                    RecommendationsOn = true
                };
                await _unitOfWork.NotificationSettings.AddAsync(setting);

                await _unitOfWork.SaveAsync();
            }

            return Ok(new NotificationSettingDto
            {
                ApplicationsOn = setting.ApplicationsOn,
                JobsOn = setting.JobsOn,
                RecommendationsOn = setting.RecommendationsOn
            });
        }

        [HttpPut("Settings")]
        public async Task<IActionResult> UpdateNotificationSetting(NotificationSettingDto editSettings)
        {
            var (user, profile, error) = await GetAuthenticatedUserAndProfileAsync();
            if (error != null) return error;

            var setting = await _unitOfWork.NotificationSettings.GetByUserIdAsync(user.UserID);

            if (setting == null)
            {
                setting = new NotificationSetting
                {
                    UserID = user.UserID,
                    ApplicationsOn = editSettings.ApplicationsOn,
                    JobsOn = editSettings.JobsOn,
                    RecommendationsOn = editSettings.RecommendationsOn
                };

                await _unitOfWork.NotificationSettings.AddAsync(setting);
            }
            else
            {
                setting.ApplicationsOn = editSettings.ApplicationsOn;
                setting.JobsOn = editSettings.JobsOn;
                setting.RecommendationsOn = editSettings.RecommendationsOn;

                _unitOfWork.NotificationSettings.Update(setting);
            }
            await _unitOfWork.SaveAsync();

            return Ok(new NotificationSettingDto
            {
                ApplicationsOn = setting.ApplicationsOn,
                JobsOn = setting.JobsOn,
                RecommendationsOn = setting.RecommendationsOn
            });
        }
    }
}
