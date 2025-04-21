using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class NotificationRepository : Repository<Notification>, INotificationRepository
    {
        public NotificationRepository(CareerAdvisorCtx context) : base(context) { }

        public async Task<IEnumerable<Notification>> GetAllByProfileIdAsync(int profileId)
        {
            return await _context.Notifications
                .Where(n => n.ProfileID == profileId)
                .ToListAsync();
        }
    }
}
