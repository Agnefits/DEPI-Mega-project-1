using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class Notification
    {
        [Key]
        public int NotificationID { get; set; }

        [ForeignKey("Profile")]
        public int ProfileID { get; set; }

        [MaxLength(50)]
        public string Type { get; set; }

        public string Content { get; set; }

        public DateTime CreatedAt { get; set; }

        public Profile Profile { get; set; }
    }
}
