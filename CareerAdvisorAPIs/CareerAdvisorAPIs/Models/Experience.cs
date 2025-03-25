using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class Experience
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ExperienceID { get; set; }

        [Required, MaxLength(255)]
        public string CompanyName { get; set; }

        [Required, MaxLength(255)]
        public string JobTitle { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public string Description { get; set; }


        [ForeignKey("User")]
        public int UserID { get; set; }
        public User User { get; set; }
    }
}
