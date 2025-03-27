namespace CareerAdvisorAPIs.DTOs.Auth
{
    public class ResetPasswordDto
    {
        public string Email { get; set; }
        public string? ResetToken { get; set; } // Optional
        public string? OldPassword { get; set; } // Optional
        public string NewPassword { get; set; }
    }
}
