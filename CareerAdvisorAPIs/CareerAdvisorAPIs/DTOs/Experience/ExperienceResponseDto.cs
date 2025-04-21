using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Experience
{
    public class ExperienceResponseDto
    {
        public int ExperienceID { get; set; }
        public string Title { get; set; }
        public string Company { get; set; }
        public string Type { get; set; }

        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }

        public string? City { get; set; }
        public string? Country { get; set; }
        public string? Description { get; set; }
    }
}
