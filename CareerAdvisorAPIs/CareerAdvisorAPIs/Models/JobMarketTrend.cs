using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class JobMarketTrend
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TrendID { get; set; }

        [Required, MaxLength(255)]
        public string SkillName { get; set; }

        [Required]
        public int DemandLevel { get; set; }

        [Required]
        public decimal AverageSalary { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
