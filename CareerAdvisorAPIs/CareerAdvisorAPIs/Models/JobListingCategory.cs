using System.ComponentModel.DataAnnotations.Schema;

namespace CareerAdvisorAPIs.Models
{
    public class JobListingCategory
    {
        [ForeignKey("JobListing")]
        public int JobID { get; set; }

        [ForeignKey("JobCategory")]
        public int CategoryID { get; set; }

        public JobListing JobListing { get; set; }
        public JobCategory JobCategory { get; set; }
    }
}
