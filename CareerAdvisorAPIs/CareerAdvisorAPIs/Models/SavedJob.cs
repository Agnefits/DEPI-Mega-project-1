using System.ComponentModel.DataAnnotations.Schema;

namespace CareerAdvisorAPIs.Models
{
    public class SavedJob
    {
        [ForeignKey("User")]
        public int UserID { get; set; }

        [ForeignKey("JobListing")]
        public int JobID { get; set; }

        public DateTime Date { get; set; }

        public User User { get; set; }
        public JobListing JobListing { get; set; }
    }
}
