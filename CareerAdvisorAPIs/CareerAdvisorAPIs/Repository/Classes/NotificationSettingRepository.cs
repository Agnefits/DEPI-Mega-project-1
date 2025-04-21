using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class NotificationSettingRepository : Repository<NotificationSetting>, INotificationSettingRepository
    {
        public NotificationSettingRepository(CareerAdvisorCtx context) : base(context) { }

        public async Task<NotificationSetting?> GetByUserIdAsync(int userId)
        {
            return await _context.NotificationSettings.FirstOrDefaultAsync(ns => ns.UserID == userId);
        }
    }
}
