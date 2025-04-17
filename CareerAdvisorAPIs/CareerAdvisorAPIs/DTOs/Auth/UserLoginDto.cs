using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Auth
{
    public class UserLoginDto
    {
        [EmailAddress, MaxLength(150)]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
