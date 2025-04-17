using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class JobBenefit
    {
        [Key]
        public int BenefitID { get; set; }

        [ForeignKey("JobListing")]
        public int JobID { get; set; }

        [Required, MaxLength(100)]
        public string Title { get; set; }
        public string Description { get; set; }

        public JobListing JobListing { get; set; }
    }
}
