using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class NotificationSettingRepository : Repository<NotificationSetting>, INotificationSettingRepository
    {
        public NotificationSettingRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
