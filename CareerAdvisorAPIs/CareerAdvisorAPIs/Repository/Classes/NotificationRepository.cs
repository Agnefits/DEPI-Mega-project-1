using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class NotificationRepository : Repository<Notification>, INotificationRepository
    {
        public NotificationRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
