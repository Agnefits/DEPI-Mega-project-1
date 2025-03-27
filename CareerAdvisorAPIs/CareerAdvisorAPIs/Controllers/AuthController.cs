using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.DTOs.Auth;
using CareerAdvisorAPIs.Helpers;

namespace CareerAdvisorAPIs.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly CareerAdvisorCtx _context;
        private readonly IConfiguration _config;
        private readonly EmailService _emailService;

        public AuthController()
        {
            _context = new CareerAdvisorCtx();
            _config = new ConfigurationBuilder()
                    .SetBasePath(AppContext.BaseDirectory)
                    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                    .Build();
            _emailService = new EmailService(_config);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest("Email already exists.");

            var verificationToken = TokenHelper.GenerateToken();

            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PasswordHash = PasswordHelper.HashPassword(dto.Password),
                AuthProvider = dto.AuthProvider,
                UserType = dto.UserType,
                SecretAnswer = dto.SecretAnswer,
                EmailVerified = false,
                VerificationToken = verificationToken,
                VerificationTokenExpiry = DateTime.UtcNow.AddHours(24),
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Send verification email
            var verificationLink = $"{_config["AppSettings:FrontendUrl"]}/verify-email?token={verificationToken}";
            await _emailService.SendEmailAsync(user.Email, "Verify Your Email", $"Click <a href='{verificationLink}'>here</a> to verify your email.");

            return Ok(new { user.UserID, user.EmailVerified });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !PasswordHelper.VerifyPassword(dto.Password, user.PasswordHash))
                return Unauthorized("Invalid email or password.");

            if (!user.EmailVerified)
                return Unauthorized("Email not verified. Please verify your account.");

            var token = TokenHelper.GenerateJwtToken(user);
            user.Token = token;
            user.TokenExpiration = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                user.Token,
                user.UserID,
                user.FirstName,
                user.LastName,
                user.Email,
                user.UserType
            });
        }


        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail(string verificationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.VerificationToken == verificationToken);
            if (user == null || user.EmailVerified || user.VerificationTokenExpiry < DateTime.UtcNow)
                return BadRequest("Invalid or expired token.");

            user.EmailVerified = true;
            user.VerificationToken = null;
            user.VerificationTokenExpiry = null;
            await _context.SaveChangesAsync();

            return Ok(new { Success = true });
        }

        [HttpPost("verify-secret-answer")]
        public async Task<IActionResult> VerifySecretAnswer(VerifySecretAnswerDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null)
                return BadRequest("User not found.");

            if (user.SecretAnswer != dto.SecretAnswer)
                return BadRequest("Incorrect answer.");

            string resetToken = TokenHelper.GenerateToken();
            user.PasswordResetToken = resetToken;
            user.ResetTokenExpiry = DateTime.UtcNow.AddHours(1);
            await _context.SaveChangesAsync();

            return Ok(new { ResetToken = resetToken });
        }


        [HttpPost("forgot-password-email")]
        public async Task<IActionResult> ForgotPasswordEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return BadRequest("User not found.");

            string resetToken = TokenHelper.GenerateToken();
            user.PasswordResetToken = resetToken;
            user.ResetTokenExpiry = DateTime.UtcNow.AddHours(1);
            await _context.SaveChangesAsync();

            string resetLink = $"{_config["AppSettings:FrontendUrl"]}/reset-password?token={resetToken}";
            string emailBody = $"Click <a href='{resetLink}'>here</a> to reset your password.";

            await _emailService.SendEmailAsync(user.Email, "Reset Your Password", emailBody);

            return Ok(new { Success = true });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null)
                return BadRequest("User not found.");

            if (!string.IsNullOrEmpty(dto.ResetToken))
            {
                if (user.PasswordResetToken != dto.ResetToken || user.ResetTokenExpiry < DateTime.UtcNow)
                    return BadRequest("Invalid or expired token.");
            }
            else
            {
                if (!PasswordHelper.VerifyPassword(dto.OldPassword, user.PasswordHash))
                    return BadRequest("Incorrect old password.");
            }

            user.PasswordHash = PasswordHelper.HashPassword(dto.NewPassword);
            user.PasswordResetToken = null;
            user.ResetTokenExpiry = null;
            await _context.SaveChangesAsync();

            return Ok(new { Success = true });
        }
    }

}

