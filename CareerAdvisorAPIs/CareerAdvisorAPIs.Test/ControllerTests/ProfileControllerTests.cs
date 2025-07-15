using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using CareerAdvisorAPIs.Controllers;
using CareerAdvisorAPIs.DTOs.Profile;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using CareerAdvisorAPIs.Services;

namespace CareerAdvisorAPIs.Tests.Controllers
{
    [TestFixture]
    public class ProfileControllerTests
    {
        private Mock<IUnitOfWork> _mockUnitOfWork;
        private Mock<IJobAIModelService> _jobAIModelService;
        private ProfileController _controller;
        private ClaimsPrincipal _user;

        [SetUp]
        public void Setup()
        {
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _jobAIModelService = new Mock<IJobAIModelService>();
            _controller = new ProfileController(_mockUnitOfWork.Object, _jobAIModelService.Object);

            // Setup test user
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, "1")
            };
            _user = new ClaimsPrincipal(new ClaimsIdentity(claims));
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = _user }
            };
        }

        #region Profile Tests

        [Test]
        public async Task GetProfile_WithValidId_ReturnsOkResult()
        {
            // Arrange
            var profile = new Profile
            {
                ProfileID = 1,
                UserID = 1,
                JobTitle = "Software Developer",
                UserSkills = new List<UserSkill>(),
                SocialLinks = new List<SocialLink>(),
                UserLanguages = new List<UserLanguage>()
            };

            _mockUnitOfWork.Setup(x => x.Profiles.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(profile);

            // Act
            var result = await _controller.GetProfile(1);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            var response = okResult.Value as ProfileResponseDto;
            Assert.That(response.JobTitle, Is.EqualTo("Software Developer"));
        }

        [Test]
        public async Task GetProfile_WithInvalidId_ReturnsNotFound()
        {
            // Arrange
            _mockUnitOfWork.Setup(x => x.Profiles.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync((Profile)null);

            // Act
            var result = await _controller.GetProfile(999);

            // Assert
            Assert.That(result, Is.TypeOf<NotFoundObjectResult>());
        }

        [Test]
        public async Task EditProfile_WithValidData_ReturnsOkResult()
        {
            // Arrange
            var user = new User { UserID = 1 };
            var profile = new Profile
            {
                ProfileID = 1,
                UserID = 1,
                UserSkills = new List<UserSkill>(),
                SocialLinks = new List<SocialLink>(),
                UserLanguages = new List<UserLanguage>()
            };
            var editDto = new EditProfileDto
            {
                JobTitle = "New Job Title",
                AboutMe = "New About Me",
                Phone = "1234567890",
                Gender = "Male",
                Type = "Professional"
            };

            _mockUnitOfWork.Setup(x => x.Users.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(user);
            _mockUnitOfWork.Setup(x => x.Profiles.GetByUserIdAsync(It.IsAny<int>()))
                .ReturnsAsync(profile);

            // Act
            var result = await _controller.EditProfile(editDto);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            dynamic response = okResult.Value;
            Assert.That(response.JobTitle, Is.EqualTo("New Job Title"));
        }

        #endregion

        #region Social Links Tests

        [Test]
        public async Task AddSocialLink_WithValidData_ReturnsOkResult()
        {
            // Arrange
            var user = new User { UserID = 1 };
            var profile = new Profile { ProfileID = 1, UserID = 1 };
            var socialLinkDto = new SocialLinkDto
            {
                Platform = "LinkedIn",
                Link = "https://linkedin.com/in/test"
            };

            _mockUnitOfWork.Setup(x => x.Users.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(user);
            _mockUnitOfWork.Setup(x => x.Profiles.GetByUserIdAsync(It.IsAny<int>()))
                .ReturnsAsync(profile);
            _mockUnitOfWork.Setup(x=>x.SocialLinks.AddAsync(new SocialLink()));

            // Act
            var result = await _controller.AddSocialLink(socialLinkDto);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            SocialResponseDto response = (SocialResponseDto)okResult.Value;
            Assert.That(response.Success, Is.True);
        }

        [Test]
        public async Task EditSocialLink_WithValidData_ReturnsOkResult()
        {
            // Arrange
            var user = new User { UserID = 1 };
            var profile = new Profile { ProfileID = 1, UserID = 1 };
            var existingLink = new SocialLink
            {
                LinkID = 1,
                ProfileID = 1,
                Platform = "LinkedIn",
                Link = "https://linkedin.com/in/test"
            };
            var socialLinkDto = new SocialLinkDto
            {
                Platform = "GitHub",
                Link = "https://github.com/test"
            };

            _mockUnitOfWork.Setup(x => x.Users.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(user);
            _mockUnitOfWork.Setup(x => x.Profiles.GetByUserIdAsync(It.IsAny<int>()))
                .ReturnsAsync(profile);
            _mockUnitOfWork.Setup(x => x.SocialLinks.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(existingLink);

            // Act
            var result = await _controller.EditSocialLink(1, socialLinkDto);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            SocialResponseDto response = (SocialResponseDto)okResult.Value;
            Assert.That(response.Success, Is.True);
        }

        [Test]
        public async Task DeleteSocialLink_WithValidId_ReturnsOkResult()
        {
            // Arrange
            var user = new User { UserID = 1 };
            var profile = new Profile { ProfileID = 1, UserID = 1 };
            var existingLink = new SocialLink
            {
                LinkID = 1,
                ProfileID = 1
            };

            _mockUnitOfWork.Setup(x => x.Users.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(user);
            _mockUnitOfWork.Setup(x => x.Profiles.GetByUserIdAsync(It.IsAny<int>()))
                .ReturnsAsync(profile);
            _mockUnitOfWork.Setup(x => x.SocialLinks.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(existingLink);

            // Act
            var result = await _controller.DeleteSocialLink(1);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            SocialResponseDto response = (SocialResponseDto)okResult.Value;
            Assert.That(response.Success, Is.True);
        }

        #endregion

        #region Languages Tests

        [Test]
        public async Task AddLanguage_WithValidData_ReturnsOkResult()
        {
            // Arrange
            var user = new User { UserID = 1 };
            var profile = new Profile { ProfileID = 1, UserID = 1 };
            string languageName = "English";

            _mockUnitOfWork.Setup(x => x.Users.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(user);
            _mockUnitOfWork.Setup(x => x.Profiles.GetByUserIdAsync(It.IsAny<int>()))
                .ReturnsAsync(profile);
            _mockUnitOfWork.Setup(x => x.Languages.GetByNameAsync(It.IsAny<string>()))
                .ReturnsAsync((Language)null);
            _mockUnitOfWork.Setup(x => x.UserLanguages.GetByProfileAndLanguageIdAsync(It.IsAny<int>(), It.IsAny<int>()))
                .ReturnsAsync((UserLanguage)null);

            // Act
            var result = await _controller.AddLanguageToUser(languageName);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            LanguageResponseDto response = (LanguageResponseDto)okResult.Value;
            Assert.That(response.Success, Is.True);
        }

        [Test]
        public async Task RemoveLanguage_WithValidData_ReturnsOkResult()
        {
            // Arrange
            var user = new User { UserID = 1 };
            var profile = new Profile { ProfileID = 1, UserID = 1 };
            var language = new Language { LanguageID = 1, Name = "English" };

            _mockUnitOfWork.Setup(x => x.Users.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(user);
            _mockUnitOfWork.Setup(x => x.Profiles.GetByUserIdAsync(It.IsAny<int>()))
                .ReturnsAsync(profile);
            _mockUnitOfWork.Setup(x => x.Languages.GetByNameAsync(It.IsAny<string>()))
                .ReturnsAsync(language);
            _mockUnitOfWork.Setup(x => x.UserLanguages.Delete(It.IsAny<int>(), It.IsAny<int>()))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.RemoveLanguageFromUser("English");

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            LanguageResponseDto response = (LanguageResponseDto)okResult.Value;
            Assert.That(response.Success, Is.True);
        }

        #endregion

        #region Skills Tests

        [Test]
        public async Task AddSkill_WithValidData_ReturnsOkResult()
        {
            // Arrange
            var user = new User { UserID = 1 };
            var profile = new Profile { ProfileID = 1, UserSkills = new List<UserSkill>(), UserID = 1 };
            string skillName = "C#";

            _mockUnitOfWork.Setup(x => x.Users.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(user);
            _mockUnitOfWork.Setup(x => x.Profiles.GetByUserIdAsync(It.IsAny<int>()))
                .ReturnsAsync(profile);
            _mockUnitOfWork.Setup(x => x.Skills.GetByNameAsync(It.IsAny<string>()))
                .ReturnsAsync((Skill)null);
            _mockUnitOfWork.Setup(x => x.UserSkills.GetByProfileAndSkillIdAsync(It.IsAny<int>(), It.IsAny<int>()))
                .ReturnsAsync((UserSkill)null);

            // Act
            var result = await _controller.AddSkillToUser(skillName);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            SkillResponseDto response = (SkillResponseDto)okResult.Value;
            Assert.That(response.Success, Is.True);
        }

        [Test]
        public async Task RemoveSkill_WithValidData_ReturnsOkResult()
        {
            // Arrange
            var user = new User { UserID = 1 };
            var profile = new Profile { ProfileID = 1, UserSkills = new List<UserSkill>(), UserID = 1 };
            var skill = new Skill { SkillID = 1, Name = "C#" };

            _mockUnitOfWork.Setup(x => x.Users.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(user);
            _mockUnitOfWork.Setup(x => x.Profiles.GetByUserIdAsync(It.IsAny<int>()))
                .ReturnsAsync(profile);
            _mockUnitOfWork.Setup(x => x.Skills.GetByNameAsync(It.IsAny<string>()))
                .ReturnsAsync(skill);
            _mockUnitOfWork.Setup(x => x.UserSkills.Delete(It.IsAny<int>(), It.IsAny<int>()))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.RemoveSkillFromUser("C#");

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            SkillResponseDto response = (SkillResponseDto)okResult.Value;
            Assert.That(response.Success, Is.True);
        }

        #endregion
    }
}