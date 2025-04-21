using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Portfolio
{
    public class PortfolioDto
    {
        [MaxLength(150)]
        public string Title { get; set; }

        public string? Description { get; set; }

        public DateTime Date { get; set; }

        public bool? DeleteImage { get; set; }

        public IFormFile? Image { get; set; }
    }
}
