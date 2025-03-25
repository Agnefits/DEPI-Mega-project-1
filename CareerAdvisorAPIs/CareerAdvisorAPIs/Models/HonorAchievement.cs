using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class HonorAchievement
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int HonorID { get; set; }

        [Required, MaxLength(255)]
        public string HonorTitle { get; set; }

        [Required, MaxLength(255)]
        public string IssuingOrganization { get; set; }

        public DateTime DateAwarded { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }
        public User User { get; set; }
    }
}
