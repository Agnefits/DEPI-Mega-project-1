using CareerAdvisorAPIs.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Profile
{
    public class ProfileResponseDto
    {
        public string? Image { get; set; }

        public string? CoverImage { get; set; }

        public string? JobTitle { get; set; }

        public string? AboutMe { get; set; }

        public string? Phone { get; set; }

        public string? Gender { get; set; }

        public string? Type { get; set; }

        public string Fullname { get; set; }

        public string? Email { get; set; }

        public string Provider { get; set; }

        public string Role { get; set; }

        public ICollection<string> UserSkills { get; set; }
        public ICollection<SocialLinkResponseDto> SocialLinks { get; set; }
        public ICollection<string> UserLanguages { get; set; }

        // Constructor that maps Profile to ProfileResponse
        public ProfileResponseDto(Models.Profile profile)
        {
            Image = profile.Image;
            CoverImage = profile.CoverImage;
            JobTitle = profile.JobTitle;
            AboutMe = profile.AboutMe;
            Phone = profile.Phone;
            Gender = profile.Gender;
            Type = profile.Type;

            // Mapping related data from User
            Fullname = profile.User?.Fullname;
            Email = profile.User?.Email;
            Provider = profile.User?.Provider;
            Role = profile.User?.Role;

            // Mapping related collections
            UserSkills = profile.UserSkills.Select(us => us.Skill.Name).ToList() ?? new List<string>();
            SocialLinks = profile.SocialLinks.Select(sl => new SocialLinkResponseDto { LinkID = sl.LinkID, Link = sl.Link, Platform = sl.Platform }).ToList() ?? new List<SocialLinkResponseDto>();
            UserLanguages = profile.UserLanguages.Select(ul => ul.Language.Name).ToList() ?? new List<string>();
        }
    }
}
