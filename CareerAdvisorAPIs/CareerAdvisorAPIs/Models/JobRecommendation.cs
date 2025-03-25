using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class JobRecommendation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int JobRecommendationID { get; set; }

        [Required, MaxLength(255)]
        public string JobTitle { get; set; }

        [Required, MaxLength(255)]
        public string CompanyName { get; set; }

        public DateTime GeneratedAt { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }
        public User User { get; set; }
    }
}
