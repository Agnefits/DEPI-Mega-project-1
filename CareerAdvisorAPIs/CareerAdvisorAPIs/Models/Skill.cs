using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class Skill
    {
        [Key]
        public int SkillID { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        public ICollection<JobListingSkill> JobListingSkills { get; set; }
        public ICollection<UserSkill> UserSkills { get; set; }
    }
}
