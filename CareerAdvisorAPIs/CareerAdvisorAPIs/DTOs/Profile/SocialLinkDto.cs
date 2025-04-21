using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Profile
{
    public class SocialLinkDto
    {
        [MaxLength(50)]
        public string Platform { get; set; }

        [Url]
        public string Link { get; set; }
    }
}
