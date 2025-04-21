using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface INotificationSettingRepository : IRepository<NotificationSetting> {

        Task<NotificationSetting?> GetByUserIdAsync(int userId);
    }

}
