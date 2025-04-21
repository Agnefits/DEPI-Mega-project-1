using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Experience
{
    public class ExperienceDto
    {
        [MaxLength(100)]
        public string Title { get; set; }

        [MaxLength(150)]
        public string Company { get; set; }

        [MaxLength(50)]
        public string Type { get; set; }

        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }

        [MaxLength(100)]
        public string? City { get; set; }

        [MaxLength(100)]
        public string? Country { get; set; }

        public string? Description { get; set; }
    }
}
