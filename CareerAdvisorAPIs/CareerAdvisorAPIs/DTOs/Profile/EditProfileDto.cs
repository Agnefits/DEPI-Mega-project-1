using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Profile
{
    public class EditProfileDto
    {

        [MaxLength(100)]
        public string? Fullname { get; set; }
        
        [MaxLength(100)]
        public string? JobTitle { get; set; }

        public string? AboutMe { get; set; }

        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(10)]
        public string? Gender { get; set; }

        [MaxLength(20)]
        public string? Type { get; set; }

        public bool? DeleteImage { get; set; }

        public bool? DeleteCoverImage { get; set; }

        public IFormFile? Image { get; set; }

        public IFormFile? CoverImage { get; set; }
    }
}
