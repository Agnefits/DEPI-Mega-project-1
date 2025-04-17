using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CareerAdvisorAPIs.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }

        [Required, MaxLength(100)]
        public string Fullname { get; set; }

        [EmailAddress, MaxLength(150)]
        public string? Email { get; set; }

        public string? PasswordHash { get; set; }

        [Required, MaxLength(50)]
        public string Provider { get; set; }

        public bool Verified { get; set; }

        [Required, MaxLength(50)]
        public string Role { get; set; }

        public DateTime CreationDate { get; set; }

        public bool IsDeleted { get; set; } = false;

        public DateTime? DeleteDate { get; set; }

        public ICollection<Token> Tokens { get; set; }
        public ICollection<JobListing> JobListings { get; set; }
        public ICollection<SavedJob> SavedJobs { get; set; }
        public ICollection<JobApplication> JobApplications { get; set; }
        public ICollection<Resume> Resumes { get; set; }
        public ICollection<InterviewSimulation> InterviewSimulations { get; set; }
        public Profile Profile { get; set; }
        public NotificationSetting NotificationSetting { get; set; }
        public ICollection<Help> HelpEntries { get; set; }
    }
}
