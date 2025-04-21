using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Portfolio
{
    public class PortfolioResponseDto
    {
        public int PortfolioID { get; set; }

        public string? Image { get; set; }

        public string Title { get; set; }

        public string? Description { get; set; }

        public DateTime Date { get; set; }
    }
}
