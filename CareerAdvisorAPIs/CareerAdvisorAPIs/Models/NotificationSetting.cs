using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class NotificationSetting
    {
        [Key, ForeignKey("User")]
        public int UserID { get; set; }

        public bool ApplicationsOn { get; set; }
        public bool JobsOn { get; set; }
        public bool RecommendationsOn { get; set; }

        public User User { get; set; }
    }
}
