using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using CareerAdvisorAPIs.Controllers;
using CareerAdvisorAPIs.DTOs.Auth;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using CareerAdvisorAPIs.Services;
using CareerAdvisorAPIs.Helpers;
using CareerAdvisorAPIs.Repository.Classes;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace CareerAdvisorAPIs.Tests.Controllers
{
    [TestFixture]
    public class AuthControllerTests
    {
        private Mock<IUnitOfWork> _mockUnitOfWork;
        private Mock<IEmailService> _mockEmailService;
        private Mock<IJwtService> _mockJwtService;
        private AuthController _controller;
        private ClaimsPrincipal _user;

        [SetUp]
        public void Setup()
        {
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _mockEmailService = new Mock<IEmailService>();
            _mockJwtService = new Mock<IJwtService>();
            _controller = new AuthController(_mockUnitOfWork.Object, _mockEmailService.Object, _mockJwtService.Object);

            // Setup test user with Doctor role
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, "1"),
                new Claim(ClaimTypes.Role, "Doctor")
            };
            _user = new ClaimsPrincipal(new ClaimsIdentity(claims));
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = _user }
            };
        }

        [Test]
        public async Task Register_WithValidData_ReturnsOkResult()
        {
            // Arrange
            var registerDto = new UserRegisterDto
            {
                FullName = "Test User",
                Email = "test@example.com",
                Password = "Password123!"
            };

            _mockUnitOfWork.Setup(x => x.Users.GetByEmailAsync(It.IsAny<string>()))
                .ReturnsAsync((User)null);

            _mockEmailService.Setup(x => x.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>()))
                .ReturnsAsync(true);

            _mockUnitOfWork.Setup(x => x.Tokens.AddAsync(new Token()));

            // Act
            var result = await _controller.Register(registerDto);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            AuthResponseDto response = (AuthResponseDto)okResult.Value;
            Console.WriteLine(response);
            Assert.IsTrue(response.Success);
            Assert.IsFalse(response.Verified);
        }

        [Test]
        public async Task Register_WithExistingEmail_ReturnsBadRequest()
        {
            // Arrange
            var registerDto = new UserRegisterDto
            {
                FullName = "Test User",
                Email = "existing@example.com",
                Password = "Password123!"
            };

            var existingUser = new User
            {
                Email = "existing@example.com",
                Verified = true
            };

            _mockUnitOfWork.Setup(x => x.Users.GetByEmailAsync(It.IsAny<string>()))
                .ReturnsAsync(existingUser);

            // Act
            var result = await _controller.Register(registerDto);

            // Assert
            Assert.That(result, Is.TypeOf<BadRequestObjectResult>());
            var badRequestResult = result as BadRequestObjectResult;
            Assert.That(badRequestResult.Value, Is.EqualTo("This email is already Registered"));
        }

        [Test]
        public async Task Login_WithValidCredentials_ReturnsOkResult()
        {
            // Arrange
            var loginDto = new UserLoginDto
            {
                Email = "test@example.com",
                Password = "Password123!"
            };

            var loginResponse = new LoginResponseDto
            {
                IsAuthenticated = true,
                Message = "Login successful"
            };

            _mockJwtService.Setup(x => x.Authenticate(It.IsAny<UserLoginDto>()))
                .ReturnsAsync(loginResponse);

            // Act
            var result = await _controller.Login(loginDto);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            var response = okResult.Value as LoginResponseDto;
            Assert.That(response.IsAuthenticated, Is.True);
        }

        [Test]
        public async Task VerifyEmail_WithValidCode_ReturnsOkResult()
        {
            // Arrange
            var verifyDto = new EmailVerificationDto
            {
                Email = "test@example.com",
                VerificationCode = "12345"
            };

            var user = new User
            {
                Email = "test@example.com",
                Verified = false
            };

            var token = new Token
            {
                TokenValue = "12345",
                ExpireDate = DateTime.UtcNow.AddHours(1),
                AvailableTries = 3
            };

            _mockUnitOfWork.Setup(x => x.Users.GetByEmailAsync(It.IsAny<string>()))
                .ReturnsAsync(user);

            _mockUnitOfWork.Setup(x => x.Users.GetLastTokenByEmailAndNameAsync(It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(token);

            _mockUnitOfWork.Setup(x => x.Tokens.Delete(new Token()));

            // Act
            var result = await _controller.VerifyEmail(verifyDto);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            AuthResponseDto response = (AuthResponseDto)okResult.Value;
            Assert.That(response.Success, Is.True);
        }

        [Test]
        public async Task ForgotPassword_WithValidEmail_ReturnsOkResult()
        {
            // Arrange
            var email = "test@example.com";
            var user = new User
            {
                Email = email,
                Fullname = "Test User"
            };

            _mockUnitOfWork.Setup(x => x.Users.GetByEmailAsync(It.IsAny<string>()))
                .ReturnsAsync(user);

            _mockEmailService.Setup(x => x.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>()))
                .ReturnsAsync(true);
            _mockUnitOfWork.Setup(x => x.Tokens.AddAsync(new Token()));

            // Act
            var result = await _controller.ForgotPasswordEmail(email);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            AuthResponseDto response = (AuthResponseDto)okResult.Value;
            Assert.That(response.Success, Is.True);
        }

        [Test]
        public async Task ResetPassword_WithValidCode_ReturnsOkResult()
        {
            // Arrange
            var resetDto = new ResetPasswordDto
            {
                Email = "test@example.com",
                ResetCode = "12345",
                NewPassword = "NewPassword123!"
            };

            var user = new User
            {
                Email = "test@example.com",
                Verified = false
            };

            var token = new Token
            {
                TokenValue = "12345",
                ExpireDate = DateTime.UtcNow.AddHours(1),
                AvailableTries = 3
            };

            _mockUnitOfWork.Setup(x => x.Users.GetByEmailAsync(It.IsAny<string>()))
                .ReturnsAsync(user);

            _mockUnitOfWork.Setup(x => x.Users.GetLastTokenByEmailAndNameAsync(It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(token);

            _mockUnitOfWork.Setup(x => x.Tokens.Delete(new Token()));

            // Act
            var result = await _controller.ResetPassword(resetDto);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            AuthResponseDto response = (AuthResponseDto)okResult.Value;
            Assert.That(response.Success, Is.True);
        }

        [Test]
        public async Task ChangePassword_WithValidData_ReturnsOkResult()
        {
            // Arrange
            var changePasswordDto = new ChangePasswordDto
            {
                OldPassword = "OldPassword123!",
                NewPassword = "NewPassword123!"
            };

            var user = new User
            {
                UserID = 1,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("OldPassword123!")
            };

            _mockUnitOfWork.Setup(x => x.Users.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(user);

            // Act
            var result = await _controller.ChangePassword(changePasswordDto);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            AuthResponseDto response = (AuthResponseDto) okResult.Value;
            Assert.That(response.Success, Is.True);
        }

        [Test]
        public async Task ChangePassword_WithInvalidOldPassword_ReturnsBadRequest()
        {
            // Arrange
            var changePasswordDto = new ChangePasswordDto
            {
                OldPassword = "WrongPassword123!",
                NewPassword = "NewPassword123!"
            };

            var user = new User
            {
                UserID = 1,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("OldPassword123!")
            };

            _mockUnitOfWork.Setup(x => x.Users.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(user);

            // Act
            var result = await _controller.ChangePassword(changePasswordDto);

            // Assert
            Assert.That(result, Is.TypeOf<BadRequestObjectResult>());
            var badRequestResult = result as BadRequestObjectResult;
            Assert.That(badRequestResult.Value, Is.EqualTo("Old password is incorrect"));
        }
    }
}