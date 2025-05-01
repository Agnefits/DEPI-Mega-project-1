using Microsoft.AspNetCore.Mvc;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using CareerAdvisorAPIs.DTOs.Portfolio;
using CareerAdvisorAPIs.Services;
using Microsoft.IdentityModel.Tokens;

namespace CareerAdvisorAPIs.Controllers
{

    [Authorize]
    [ApiController]
    [Route("api/Portfolio")]
    public class PortfolioController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _env;

        public PortfolioController(IUnitOfWork unitOfWork, IWebHostEnvironment env)
        {
            _unitOfWork = unitOfWork;
            _env = env;
        }

        // Helper method to get user + profile
        private async Task<(Profile profile, IActionResult errorResult)> GetUserProfileAsync()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return (null, Unauthorized("Unauthorized user"));

            var profile = await _unitOfWork.Profiles.GetByUserIdAsync(int.Parse(userId));
            if (profile == null)
                return (null, NotFound("Profile not found"));

            return (profile, null);
        }

        [HttpGet("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetAll(int? id)
        {
            if (id != null)
            {
                var userItems = await _unitOfWork.Portfolios.GetAllByProfileIdAsync(id.Value);
                if (userItems == null)
                    return NotFound("Profile not found");
                return Ok(userItems);
            }

            var (profile, error) = await GetUserProfileAsync();
            if (error != null) return error;

            var items = await _unitOfWork.Portfolios.GetAllByProfileIdAsync(profile.ProfileID);
            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> Add(PortfolioDto addPortfolio)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var (profile, error) = await GetUserProfileAsync();
            if (error != null) return error;

            var portfolio = new Portfolio
            {
                ProfileID = profile.ProfileID,
                Title = addPortfolio.Title,
                Description = addPortfolio.Description,
                Date = addPortfolio.Date
            };

            await _unitOfWork.Portfolios.AddAsync(portfolio);
            await _unitOfWork.SaveAsync();

            if (addPortfolio.Image != null)
            {
                var imagePath = await FileService.SaveFile($"Portfolios/{portfolio.PortfolioID}/images", addPortfolio.Image);
                portfolio.Image = imagePath; // Save the file path in the database
            }

            await _unitOfWork.SaveAsync();
            return Ok(new
            {
                Success = true,
                Message = "Portfolio added",
                Portfolio = new PortfolioResponseDto
                {
                    PortfolioID = portfolio.PortfolioID,
                    Title = portfolio.Title,
                    Image = portfolio.Image,
                    Date = portfolio.Date,
                    Description = portfolio.Description
                }
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PortfolioDto editPortfolio)
        {
            if (!ModelState.IsValid)
                return BadRequest("Fields are not valid");

            var (profile, error) = await GetUserProfileAsync();
            if (error != null) return error;

            var portfolio = await _unitOfWork.Portfolios.GetByIdAsync(id);
            if (portfolio == null || portfolio.ProfileID != profile.ProfileID)
                return NotFound("Portfolio not found");

            portfolio.Title = editPortfolio.Title;
            portfolio.Description = editPortfolio.Description;
            portfolio.Date = editPortfolio.Date;

            if ((editPortfolio.DeleteImage ?? false) && !string.IsNullOrEmpty(portfolio.Image))
            {
                FileService.DeleteFile(portfolio.Image);
                portfolio.Image = null;
            }

            if (editPortfolio.Image != null)
            {
                // Delete old image if exists
                if (!string.IsNullOrEmpty(portfolio.Image))
                {
                    FileService.DeleteFile(portfolio.Image);
                }

                var imagePath = await FileService.SaveFile($"Portfolios/{portfolio.PortfolioID}/images", editPortfolio.Image);
                portfolio.Image = imagePath; // Save the file path in the database
            }

            _unitOfWork.Portfolios.Update(portfolio);
            await _unitOfWork.SaveAsync();
            return Ok(new
            {
                Success = true,
                Message = "Portfolio updated",
                Portfolio = new PortfolioResponseDto
                {
                    PortfolioID = portfolio.PortfolioID,
                    Title = portfolio.Title,
                    Image = portfolio.Image,
                    Date = portfolio.Date,
                    Description = portfolio.Description
                }
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var (profile, error) = await GetUserProfileAsync();
            if (error != null) return error;

            var item = await _unitOfWork.Portfolios.GetByIdAsync(id);
            if (item == null || item.ProfileID != profile.ProfileID)
                return NotFound("Portfolio not found");

            // Delete image if exists
            if (!string.IsNullOrEmpty(item.Image))
            {
                FileService.DeleteFile(item.Image);
            }

            _unitOfWork.Portfolios.Delete(item);
            await _unitOfWork.SaveAsync();
            return Ok(new { Success = true, Message = "Deleted successfully" });
        }

        [AllowAnonymous]
        [HttpGet("{portfolioID}/images/{imageName}")]
        public async Task<IActionResult> GetProfileImage(int portfolioID, string imageName)
        {
            var filePath = $"Portfolios/{portfolioID}/images/{imageName}";

            var fullDirPath = Path.Combine(FileService.imageDirectory, filePath);

            if (!System.IO.File.Exists(fullDirPath))
                return NotFound("Image not found.");

            var mimeType = "image/" + Path.GetExtension(imageName).TrimStart('.'); // basic mime type
            return PhysicalFile(fullDirPath, mimeType);
        }
    }
}
