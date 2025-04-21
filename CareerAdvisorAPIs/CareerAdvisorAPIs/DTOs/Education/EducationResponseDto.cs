using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Education
{
    public class EducationResponseDto
    {
        public int EducationID { get; set; }
        public string University { get; set; }
        public string Degree { get; set; }

        public DateTime DateFrom { get; set; }
        public DateTime? DateTo { get; set; }

        public string? Description { get; set; }
    }
}

