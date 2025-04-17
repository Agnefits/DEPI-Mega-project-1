using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.Models
{
    public class Resume
    {
        [Key]
        public int ResumeID { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }

        public string File { get; set; }

        [MaxLength(150)]
        public string FileName { get; set; }

        public DateTime Date { get; set; }

        public User User { get; set; }
    }
}
