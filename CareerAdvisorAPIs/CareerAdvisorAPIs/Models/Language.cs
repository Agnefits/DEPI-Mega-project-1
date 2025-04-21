using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class Language
    {
        [Key]
        public int LanguageID { get; set; }

        [Required, MaxLength(50)]
        public string Name { get; set; }

        public ICollection<UserLanguage> UserLanguages { get; set; }
    }
}
