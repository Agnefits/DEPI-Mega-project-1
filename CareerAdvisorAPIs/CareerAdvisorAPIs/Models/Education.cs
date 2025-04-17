using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class Education
    {
        [Key]
        public int EducationID { get; set; }

        [ForeignKey("Profile")]
        public int ProfileID { get; set; }

        [MaxLength(150)]
        public string University { get; set; }

        [MaxLength(100)]
        public string Degree { get; set; }

        public DateTime DateFrom { get; set; }
        public DateTime? DateTo { get; set; }

        public string? Description { get; set; }

        public Profile Profile { get; set; }
    }

}
