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
                    CreationDate = DateTime.UtcNow
                };
                await _unitOfWork.Users.AddAsync(user);
            }
            else
            {
                user.Fullname = dto.FullName;
                user.Email = dto.Email;
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
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
            bool status = await _emailService.SendEmailAsync(
     user.Email,
     "Verify Your Email - JobGenius",
     $@"
    <html>
    <head>
        <style>
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
            }}
            .container {{
                background-color: #ffffff;
                border-radius: 8px;
                max-width: 600px;
                margin: auto;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                overflow: hidden;
            }}
            .header {{
                background-color: #007BFF;
                color: white;
                padding: 20px;
                text-align: center;
            }}
            .header h1 {{
                margin: 0;
                font-size: 24px;
            }}
            .content {{
                padding: 30px;
                text-align: center;
            }}
            .content p {{
                font-size: 16px;
                color: #333;
            }}
            .verification-code {{
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                font-size: 20px;
                color: #007BFF;
                background-color: #eaf3ff;
                border-radius: 5px;
                font-weight: bold;
                letter-spacing: 2px;
            }}
            .footer {{
                background-color: #f0f0f0;
                padding: 20px;
                text-align: center;
                font-size: 13px;
                color: #666;
            }}
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>Welcome to JobGenius</h1>
            </div>
            <div class='content'>
                <p>Hi {user.Fullname},</p>
                <p>Thank you for joining <strong>JobGenius</strong>, your AI-powered career companion.</p>
                <p>To activate your account, please use the verification code below:</p>
                <div class='verification-code'>{verificationCode}</div>
                <p>This code will expire in 1 hour. Please do not share it with anyone.</p>
            </div>
            <div class='footer'>
                <p>&copy; {DateTime.Now.Year} JobGenius. All rights reserved.</p>
                <p>Your future, guided by AI.</p>
            </div>
        </div>
    </body>
    </html>
    ",
     true
 );

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


        [HttpPost("verify")]
        [HttpPost("verify-email")]
        public async Task<IActionResult> VerifyEmail(EmailVerificationDto verifyEmailDto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var user = await _unitOfWork.Users.GetByEmailAsync(verifyEmailDto.Email);
            if (user == null)
                return NotFound("No user found with that email");
            else if (user.Verified)
                return BadRequest("Email already verified");

            var token = await _unitOfWork.Users.GetLastTokenByEmailAndNameAsync(verifyEmailDto.Email, "VerifyEmail");
            if (token == null)
                return NotFound("No token found for this user");
            else if (token.ExpireDate < DateTime.UtcNow)
                return Unauthorized("Token expired");
            else if (token.TokenValue != verifyEmailDto.VerificationCode)
            {
                token.AvailableTries--;
                if (token.AvailableTries <= 0)
                {
                    _unitOfWork.Tokens.Delete(token);
                    await _unitOfWork.SaveAsync();
                    return Unauthorized("Token expired");
                }
                else
                {
                    await _unitOfWork.SaveAsync();
                    return Unauthorized("Invalid verification code");
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

        [HttpPost("forgot-password")]
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
            bool status = await _emailService.SendEmailAsync(
                user.Email,
                "Reset Your Password - JobGenius",
                $@"
    <html>
    <head>
        <style>
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f7f8fa;
                padding: 20px;
            }}
            .container {{
                background-color: #ffffff;
                border-radius: 10px;
                max-width: 600px;
                margin: auto;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                overflow: hidden;
            }}
            .header {{
                background-color: #343a40;
                color: #ffffff;
                padding: 25px;
                text-align: center;
            }}
            .header h1 {{
                margin: 0;
                font-size: 22px;
            }}
            .content {{
                padding: 30px;
                text-align: center;
            }}
            .content p {{
                font-size: 16px;
                color: #444444;
                line-height: 1.6;
            }}
            .reset-code {{
                display: inline-block;
                margin-top: 20px;
                padding: 12px 24px;
                font-size: 22px;
                background-color: #007BFF;
                color: white;
                border-radius: 8px;
                letter-spacing: 3px;
                font-weight: bold;
            }}
            .footer {{
                background-color: #f1f1f1;
                text-align: center;
                padding: 20px;
                font-size: 13px;
                color: #777;
            }}
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>Password Reset Request</h1>
            </div>
            <div class='content'>
                <p>Hi {user.Fullname},</p>
                <p>We received a request to reset your password for your <strong>JobGenius</strong> account.</p>
                <p>Use the reset code below to proceed:</p>
                <div class='reset-code'>{resetPasswordCode}</div>
                <p>This code will expire in 1 hour. If you did not request a password reset, please ignore this email.</p>
            </div>
            <div class='footer'>
                <p>&copy; {DateTime.Now.Year} JobGenius. All rights reserved.</p>
                <p>Your future, guided by AI.</p>
            </div>
        </div>
    </body>
    </html>
    ",
                true
            );
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

            // Get the userId from the authenticated user
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Unauthorized user");

            var user = await _unitOfWork.Users.GetByIdAsync(int.Parse(userId));
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

