using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CareerAdvisorAPIs.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserID { get; set; }

        [Required, MaxLength(100)]
        public string FirstName { get; set; }

        [Required, MaxLength(100)]
        public string LastName { get; set; }

        [Required, EmailAddress, MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required, MaxLength(50)]
        public string AuthProvider { get; set; } // ENUM: Google, Facebook, etc.

        [Required, MaxLength(50)]
        public string UserType { get; set; } // ENUM: Employee, Company

        [Required]
        public string SecretAnswer { get; set; }

        public bool EmailVerified { get; set; }

        public DateTime CreatedAt { get; set; }

        public string? Token { get; set; }

        public DateTime? TokenExpiration { get; set; }

        public string? VerificationToken { get; set; }

        public DateTime? VerificationTokenExpiry { get; set; }

        public string? PasswordResetToken { get; set; }

        public DateTime? ResetTokenExpiry { get; set; }

        public Profile Profile { get; set; }

        public ICollection<Skill> Skills { get; set; } = new List<Skill>();
        public ICollection<Experience> Experiences { get; set; } = new List<Experience>();
        public ICollection<Education> Educations { get; set; } = new List<Education>();
        public ICollection<CertificationCourse> CertificationCourses { get; set; } = new List<CertificationCourse>();
        public ICollection<Language> Languages { get; set; } = new List<Language>();
        public ICollection<Project> Projects { get; set; } = new List<Project>();
        public ICollection<HonorAchievement> Honors { get; set; } = new List<HonorAchievement>();
        public ICollection<VolunteerExperience> VolunteerExperiences { get; set; } = new List<VolunteerExperience>();
        public ICollection<Cause> Causes { get; set; } = new List<Cause>();
        public ICollection<Service> Services { get; set; } = new List<Service>();
        public ICollection<JobApplication> JobApplications { get; set; } = new List<JobApplication>();
        public ICollection<JobRecommendation> JobRecommendations { get; set; } = new List<JobRecommendation>();
        public ICollection<ResumeFeedback> ResumeFeedbacks { get; set; } = new List<ResumeFeedback>();
        public ICollection<InterviewSimulation> InterviewSimulations { get; set; } = new List<InterviewSimulation>();

    }
}
