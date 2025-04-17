using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class SocialLink
    {
        [Key]
        public int LinkID { get; set; }

        [ForeignKey("Profile")]
        public int ProfileID { get; set; }

        [MaxLength(50)]
        public string Platform { get; set; }

        [Url]
        public string Link { get; set; }

        public Profile Profile { get; set; }
    }
}
