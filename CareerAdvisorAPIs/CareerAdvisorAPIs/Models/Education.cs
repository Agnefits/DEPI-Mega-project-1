using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class Education
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EducationID { get; set; }

        [Required, MaxLength(255)]
        public string InstitutionName { get; set; }

        [Required, MaxLength(255)]
        public string Degree { get; set; }

        [Required, MaxLength(255)]
        public string FieldOfStudy { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }
        public User User { get; set; }
    }
}
