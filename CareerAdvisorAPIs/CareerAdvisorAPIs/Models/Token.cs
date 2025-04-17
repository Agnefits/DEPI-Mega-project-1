using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class Token
    {
        [Key]
        public int TokenID { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }

        [Required, MaxLength(100)]
        public string TokenName { get; set; }

        [Required]
        public string TokenValue { get; set; }

        public int AvailableTries { get; set; } = 3;

        public DateTime CreationDate { get; set; }
        public DateTime ExpireDate { get; set; }

        public User User { get; set; }
    }
}
