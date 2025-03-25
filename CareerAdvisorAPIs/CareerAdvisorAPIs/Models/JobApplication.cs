using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class JobApplication
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int JobApplicationID { get; set; }

        [Required, MaxLength(255)]
        public string JobTitle { get; set; }

        [Required, MaxLength(255)]
        public string CompanyName { get; set; }

        public string JobDescription { get; set; }
        
        public DateTime AppliedDate { get; set; }

        public string Status { get; set; }

        public string Notes { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }
        public User User { get; set; }
    }
}
