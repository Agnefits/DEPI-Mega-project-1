using CareerAdvisorAPIs.DTOs.Auth;

namespace CareerAdvisorAPIs.Services
{
    public interface IJwtService
    {
        Task<LoginResponseDto> Authenticate(UserLoginDto userLoginDto);
    }
}
