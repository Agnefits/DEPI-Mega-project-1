namespace CareerAdvisorAPIs.DTOs.Profile
{
    public class SocialResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public SocialLinkResponseDto SocialLink { get; set; }
    }
}
