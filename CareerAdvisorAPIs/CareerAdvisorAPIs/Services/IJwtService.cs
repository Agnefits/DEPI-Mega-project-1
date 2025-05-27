using CareerAdvisorAPIs.DTOs.Auth;
using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Services
{
    public interface IJwtService
    {
        Task<LoginResponseDto> Authenticate(UserLoginDto userLoginDto);
        LoginResponseDto Authenticate(User user);
    }
}
