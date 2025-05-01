using CareerAdvisorAPIs.DTOs.Auth;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CareerAdvisorAPIs.Services
{
    public class JwtService
    {
        private IUnitOfWork _unitOfWork;
        private IConfiguration _configuration;

        public JwtService(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }

        public async Task<LoginResponseDto> Authenticate(UserLoginDto userLoginDto)
        {
            if (string.IsNullOrEmpty(userLoginDto.Email) || string.IsNullOrEmpty(userLoginDto.Password))
                return new LoginResponseDto { IsAuthenticated = false, Message = "Email or password is emply" };

            var user = await _unitOfWork.Users.GetByEmailAsync(userLoginDto.Email);
            if (user == null)
                return new LoginResponseDto { IsAuthenticated = false, Message = "No user found with that email" };
            else if (user.Provider != "Email")
                return new LoginResponseDto { IsAuthenticated = false, Message = "This email is not registered with us" };
            else if (user.Verified == false)
                return new LoginResponseDto { IsAuthenticated = false, Message = "Email not verified" };
            else if (!BCrypt.Net.BCrypt.Verify(userLoginDto.Password, user.PasswordHash))
                return new LoginResponseDto { IsAuthenticated = false, Message = "Password is incorrect" };
            else
            {
                var issuer = _configuration["JwtConfig:Issuer"];
                var audience = _configuration["JwtConfig:Audience"];
                var secret = _configuration["JwtConfig:Secret"];
                var tokenValidityMins = _configuration.GetValue<int>("JwtConfig:TokenValidityMins");
                var tokenExpiryTimeStamp = DateTime.UtcNow.AddMinutes(tokenValidityMins);

                // Generate JWT token
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString()),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(ClaimTypes.Name, user.Fullname),
                    }),
                    Expires = tokenExpiryTimeStamp,
                    Issuer = issuer,
                    Audience = audience,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)), SecurityAlgorithms.HmacSha256)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var accessToken = tokenHandler.WriteToken(securityToken);

                return new LoginResponseDto
                {
                    IsAuthenticated = true,
                    Email = user.Email,
                    Fullname = user.Fullname,
                    Token = accessToken,
                    ExpiresIn = (int)(tokenExpiryTimeStamp - DateTime.UtcNow).TotalSeconds,
                    Message = "Login successful"
                };
            }
        }
    }
}
