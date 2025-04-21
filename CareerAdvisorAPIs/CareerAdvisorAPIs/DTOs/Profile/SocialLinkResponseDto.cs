using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Profile
{
    public class SocialLinkResponseDto
    {
        public int LinkID { get; set; }

        public string Platform { get; set; }

        public string Link { get; set; }
    }
}
