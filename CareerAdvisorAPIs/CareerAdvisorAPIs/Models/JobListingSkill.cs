using System.ComponentModel.DataAnnotations.Schema;

namespace CareerAdvisorAPIs.Models
{
    public class JobListingSkill
    {
        [ForeignKey("JobListing")]
        public int JobID { get; set; }

        [ForeignKey("Skill")]
        public int SkillID { get; set; }

        public JobListing JobListing { get; set; }
        public Skill Skill { get; set; }
    }
}
