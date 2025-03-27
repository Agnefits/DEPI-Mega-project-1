namespace CareerAdvisorAPIs.DTOs.Auth
{
    public class EmailVerificationDto
    {
        public string Email { get; set; }
        public string VerificationCode { get; set; }
    }
}
