using System.ComponentModel.DataAnnotations.Schema;

namespace CareerAdvisorAPIs.Models
{
    public class UserSkill
    {
        [ForeignKey("Profile")]
        public int ProfileID { get; set; }

        [ForeignKey("Skill")]
        public int SkillID { get; set; }

        public Profile Profile { get; set; }
        public Skill Skill { get; set; }
    }
}
