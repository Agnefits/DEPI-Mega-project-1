using System.ComponentModel.DataAnnotations.Schema;

namespace CareerAdvisorAPIs.Models
{
    public class UserLanguage
    {
        [ForeignKey("Profile")]
        public int ProfileID { get; set; }

        [ForeignKey("Language")]
        public int LanguageID { get; set; }

        public Profile Profile { get; set; }
        public Language Language { get; set; }
    }
}
