using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class Portfolio
    {
        [Key]
        public int PortfolioID { get; set; }

        [ForeignKey("Profile")]
        public int ProfileID { get; set; }

        public string? Image { get; set; }

        [MaxLength(150)]
        public string Title { get; set; }

        public string? Description { get; set; }

        public DateTime Date { get; set; }

        public Profile Profile { get; set; }
    }
}
