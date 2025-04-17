using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Auth
{
    public class EmailVerificationDto
    {

        [EmailAddress, MaxLength(150)]
        public string Email { get; set; }
        [Required, MaxLength(5), MinLength(5)]
        public string VerificationCode { get; set; }
    }
}
