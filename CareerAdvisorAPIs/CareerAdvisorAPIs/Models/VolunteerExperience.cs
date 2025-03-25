using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class VolunteerExperience
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VolunteerID { get; set; }

        [Required, MaxLength(255)]
        public string OrganizationName { get; set; }

        [Required, MaxLength(255)]
        public string Role { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }
        public User User { get; set; }
    }
}
