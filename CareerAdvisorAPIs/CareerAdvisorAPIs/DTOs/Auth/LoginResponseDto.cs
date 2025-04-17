using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.DTOs.Auth
{
    public class LoginResponseDto
    {
        public string Email { get; set; }
        public string Fullname { get; set; }
        public string Token { get; set; }
        public int ExpiresIn { get; set; }
        public bool IsAuthenticated { get; set; }
        public string Message { get; set; }
    }
}
