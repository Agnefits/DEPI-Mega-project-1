using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class Profile
    {
        [Key]
        public int ProfileID { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }

        public string? Image { get; set; }
        public string? CoverImage { get; set; }

        [MaxLength(100)]
        public string? JobTitle { get; set; }

        public string? AboutMe { get; set; }

        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(10)]
        public string? Gender { get; set; }

        [MaxLength(20)]
        public string? Type { get; set; }

        public User User { get; set; }

        public ICollection<UserSkill> UserSkills { get; set; }
        public ICollection<SocialLink> SocialLinks { get; set; }
        public ICollection<Portfolio> Portfolios { get; set; }
        public ICollection<Notification> Notifications { get; set; }
        public ICollection<UserLanguage> UserLanguages { get; set; }
        public ICollection<Experience> Experiences { get; set; }
        public ICollection<Education> Educations { get; set; }
    }
}
