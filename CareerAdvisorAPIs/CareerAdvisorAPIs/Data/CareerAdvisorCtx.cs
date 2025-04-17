using CareerAdvisorAPIs.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace CareerAdvisorAPIs.Data
{
    public class CareerAdvisorCtx : DbContext
    {
        public CareerAdvisorCtx(DbContextOptions<CareerAdvisorCtx> options) : base(options) { }

        // Users and authentication
        public DbSet<User> Users { get; set; }
        public DbSet<Token> Tokens { get; set; }

        // Jobs
        public DbSet<JobListing> JobListings { get; set; }
        public DbSet<JobCategory> JobCategories { get; set; }
        public DbSet<JobListingCategory> JobListingCategories { get; set; }
        public DbSet<JobBenefit> JobBenefits { get; set; }
        public DbSet<SavedJob> SavedJobs { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }

        // Profiles
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<UserLanguage> UserLanguages { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<UserSkill> UserSkills { get; set; }
        public DbSet<JobListingSkill> JobListingSkills { get; set; }
        public DbSet<SocialLink> SocialLinks { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Education> Educations { get; set; }

        // Resumes and interview
        public DbSet<Resume> Resumes { get; set; }
        public DbSet<ResumeFeedback> ResumeFeedbacks { get; set; }
        public DbSet<InterviewSimulation> InterviewSimulations { get; set; }

        // Notifications and Help
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<NotificationSetting> NotificationSettings { get; set; }
        public DbSet<Help> HelpEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Composite Keys
            modelBuilder.Entity<JobListingCategory>()
                .HasKey(jc => new { jc.JobID, jc.CategoryID });

            modelBuilder.Entity<JobListingSkill>()
                .HasKey(js => new { js.JobID, js.SkillID });

            modelBuilder.Entity<UserLanguage>()
                .HasKey(ul => new { ul.ProfileID, ul.LanguageID });

            modelBuilder.Entity<UserSkill>()
                .HasKey(us => new { us.ProfileID, us.SkillID });

            modelBuilder.Entity<SavedJob>()
                .HasKey(sj => new { sj.UserID, sj.JobID });

            modelBuilder.Entity<NotificationSetting>()
                .HasKey(ns => ns.UserID);
        }
    }

}
