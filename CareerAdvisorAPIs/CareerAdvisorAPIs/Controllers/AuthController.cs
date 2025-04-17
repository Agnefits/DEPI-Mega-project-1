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
using CareerAdvisorAPIs.Repository.Interfaces;
using CareerAdvisorAPIs.Services;
using Microsoft.AspNetCore.Authorization;

namespace CareerAdvisorAPIs.Controllers
{
    [Route("api/auth")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly EmailService _emailService;
        private readonly JwtService _jwtService;

        public AuthController(IUnitOfWork unitOfWork, EmailService emailService, JwtService jwtService)
        {
            _unitOfWork = unitOfWork;
            _emailService = emailService;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var user = await _unitOfWork.Users.GetByEmailAsync(dto.Email);
            if (user != null && user.Verified)
                return BadRequest("This email is already Registered");



            // Check if the user already exists but not verified yet
            if (user == null)
            {
                user = new User
                {
                    Fullname = dto.FullName,
                    Email = dto.Email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                    Provider = "Email",
                    Role = dto.Role,
                    CreationDate = DateTime.UtcNow
                };
                await _unitOfWork.Users.AddAsync(user);
            }
            else
            {
                user.Fullname = dto.FullName;
                user.Email = dto.Email;
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
                user.Fullname = dto.Role;
                user.CreationDate = DateTime.UtcNow;
                _unitOfWork.Users.Update(user);
            }

            // Generate verification code
            string verificationCode = RandomCodeService.GenerateFiveDigitCode();

            await _unitOfWork.Tokens.AddAsync(new Token
            {
                User = user,
                TokenName = "VerifyEmail",
                TokenValue = verificationCode,
                CreationDate = DateTime.UtcNow,
                ExpireDate = DateTime.UtcNow.AddHours(1)
            });

            // Save changes to the database
            await _unitOfWork.SaveAsync();

            // Send verification email
            bool status = await _emailService.SendEmailAsync(user.Email, "Verify Your Email", $"Verification Code: {verificationCode}.", false);
            if (!status)
                return StatusCode(500, "Error: Message not sent");
            else
                return Ok(new { Success = true, user.Verified, Message = "Account created successfully, verification code sent to email" });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            LoginResponseDto resonse = await _jwtService.Authenticate(dto);
            if (!resonse.IsAuthenticated)
                return BadRequest(resonse.Message);
            else
                return Ok(resonse);
        }


        [HttpPost("verify-email")]
        public async Task<IActionResult> VerifyEmail(EmailVerificationDto verifyEmailDto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var user = await _unitOfWork.Users.GetByEmailAsync(verifyEmailDto.Email);
            if (user == null)
                return BadRequest("No user found with that email");
            else if (user.Verified)
                return BadRequest("Email already verified");

            var token = await _unitOfWork.Users.GetLastTokenByEmailAndNameAsync(verifyEmailDto.Email, "VerifyEmail");
            if (token == null)
                return BadRequest("No token found for this user");
            else if (token.ExpireDate < DateTime.UtcNow)
                return BadRequest("Token expired");
            else if (token.TokenValue != verifyEmailDto.VerificationCode)
            {
                token.AvailableTries--;
                if (token.AvailableTries <= 0)
                {
                    _unitOfWork.Tokens.Delete(token);
                    await _unitOfWork.SaveAsync();
                    return BadRequest("Token expired");
                }
                else
                {
                    await _unitOfWork.SaveAsync();
                    return BadRequest("Invalid verification code");
                }
            }
            else
            {
                // Delete the token after successful verification
                _unitOfWork.Tokens.Delete(token);

                // Update user verification status
                user.Verified = true;
                await _unitOfWork.SaveAsync();

                return Ok(new { Success = true, Message = "Email verified" });
            }
        }

        [HttpPost("forgot-password-email")]
        public async Task<IActionResult> ForgotPasswordEmail(string email)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var user = await _unitOfWork.Users.GetByEmailAsync(email);
            if (user == null)
                return BadRequest("No user found with that email");

            // Generate reset code
            string resetPasswordCode = RandomCodeService.GenerateFiveDigitCode();

            await _unitOfWork.Tokens.AddAsync(new Token
            {
                User = user,
                TokenName = "ResetPassword",
                TokenValue = resetPasswordCode,
                CreationDate = DateTime.UtcNow,
                ExpireDate = DateTime.UtcNow.AddHours(1)
            });

            // Save changes to the database
            await _unitOfWork.SaveAsync();

            // Send verification email
            bool status = await _emailService.SendEmailAsync(user.Email, "Reset Your Password", $"Reset Code: {resetPasswordCode}.", false);
            if (!status)
                return StatusCode(500, "Error: Message not sent");
            else
                return Ok(new { Success = true, Message = "Reset code sent to email" });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var user = await _unitOfWork.Users.GetByEmailAsync(resetPasswordDto.Email);
            if (user == null)
                return BadRequest("No user found with that email");

            var token = await _unitOfWork.Users.GetLastTokenByEmailAndNameAsync(resetPasswordDto.Email, "ResetPassword");
            if (token == null)
                return BadRequest("No token found for this user");
            else if (token.ExpireDate < DateTime.UtcNow)
                return BadRequest("Token expired");
            else if (token.TokenValue != resetPasswordDto.ResetCode)
            {
                token.AvailableTries--;
                if (token.AvailableTries <= 0)
                {
                    _unitOfWork.Tokens.Delete(token);
                    await _unitOfWork.SaveAsync();
                    return BadRequest("Token expired");
                }
                else
                {
                    await _unitOfWork.SaveAsync();
                    return BadRequest("Invalid reset code");
                }
            }
            else
            {
                // Delete the token after successful verification
                _unitOfWork.Tokens.Delete(token);

                // Update user password
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(resetPasswordDto.NewPassword);
                // If the user was not verified, mark them as verified
                user.Verified = true;
                await _unitOfWork.SaveAsync();

                return Ok(new { Success = true, Message = "Password changed successfully" });
            }
        }

        [Authorize]
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            // Get the email from the authenticated user
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
                return Unauthorized("Unauthorized user");

            var user = await _unitOfWork.Users.GetByEmailAsync(email);
            if (user == null)
                return NotFound("User not found");

            // Verify the old password
            if (!BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.PasswordHash))
                return BadRequest("Old password is incorrect");

            // Verify that the new password is not the same old one
            if (BCrypt.Net.BCrypt.Verify(dto.NewPassword, user.PasswordHash))
                return BadRequest("New password must be different from the current password.");

            // Hash and save the new password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            await _unitOfWork.SaveAsync();

            return Ok(new { Success = true, Message = "Password changed successfully" });
        }

    }

}

