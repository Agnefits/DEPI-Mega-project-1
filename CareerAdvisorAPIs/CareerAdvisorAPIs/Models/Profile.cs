using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class Profile
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProfileID { get; set; }

        public string ProfileImage { get; set; }
        public string BannerImage { get; set; }
        public string Headline { get; set; }
        public string About { get; set; }
        
        [ForeignKey("User")]
        public int UserID { get; set; }
        public User User { get; set; }
    }
}
