using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Education
{
    public class EducationDto
    {
        [MaxLength(150)]
        public string University { get; set; }

        [MaxLength(100)]
        public string Degree { get; set; }

        public DateTime DateFrom { get; set; }
        public DateTime? DateTo { get; set; }

        public string? Description { get; set; }
    }
}

