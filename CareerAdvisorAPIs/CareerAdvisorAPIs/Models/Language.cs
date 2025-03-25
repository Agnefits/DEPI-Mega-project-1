using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class Language
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LanguageID { get; set; }

        [Required, MaxLength(100)]
        public string LanguageName { get; set; }

        [Required, MaxLength(50)]
        public string Proficiency { get; set; } // ENUM: Beginner, Intermediate, Advanced, Native

        [ForeignKey("User")]
        public int UserID { get; set; }
        public User User { get; set; }
    }
}
