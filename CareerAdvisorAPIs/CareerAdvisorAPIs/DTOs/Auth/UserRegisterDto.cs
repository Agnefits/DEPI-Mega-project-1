namespace CareerAdvisorAPIs.DTOs.Auth
{
    public class UserRegisterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string AuthProvider { get; set; }
        public string UserType { get; set; }
        public string SecretAnswer { get; set; }
    }
}
