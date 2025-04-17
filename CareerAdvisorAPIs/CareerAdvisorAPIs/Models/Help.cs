using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class Help
    {
        [Key]
        public int HelpID { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }

        [MaxLength(200)]
        public string Title { get; set; }

        public string Description { get; set; }

        public User User { get; set; }
    }
}
