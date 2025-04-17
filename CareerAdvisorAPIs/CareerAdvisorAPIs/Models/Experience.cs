using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class Experience
    {
        [Key]
        public int ExperienceID { get; set; }

        [ForeignKey("Profile")]
        public int ProfileID { get; set; }

        [MaxLength(100)]
        public string Title { get; set; }

        [MaxLength(150)]
        public string Company { get; set; }

        [MaxLength(50)]
        public string Type { get; set; }

        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }

        [MaxLength(100)]
        public string? City { get; set; }

        [MaxLength(100)]
        public string? Country { get; set; }

        public string? Description { get; set; }

        public Profile Profile { get; set; }
    }
}
