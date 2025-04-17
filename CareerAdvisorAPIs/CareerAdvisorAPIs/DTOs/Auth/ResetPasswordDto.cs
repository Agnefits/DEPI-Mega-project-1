using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Auth
{
    public class ResetPasswordDto
    {
        [EmailAddress, MaxLength(150)]
        public string Email { get; set; }
        [Required, MaxLength(5), MinLength(5)]
        public string ResetCode { get; set; }
        public string NewPassword { get; set; }
    }
}
