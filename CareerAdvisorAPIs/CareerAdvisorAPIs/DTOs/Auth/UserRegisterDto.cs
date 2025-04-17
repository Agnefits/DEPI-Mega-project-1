using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Auth
{
    public class UserRegisterDto
    {
        [Required, MaxLength(100)]
        public string FullName { get; set; }
        [EmailAddress, MaxLength(150)]
        public string Email { get; set; }
        public string Password { get; set; }
        [Required, MaxLength(50)]
        public string Role { get; set; }

    }
}
