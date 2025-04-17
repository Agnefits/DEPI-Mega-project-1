using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class JobCategory
    {
        [Key]
        public int CategoryID { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        public ICollection<JobListingCategory> JobListingCategories { get; set; }
    }
}
