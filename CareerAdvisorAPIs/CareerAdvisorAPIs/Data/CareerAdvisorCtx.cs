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
        public DbSet<JobListingQuestion> JobListingQuestions { get; set; }
        public DbSet<JobApplicationAnswer> JobApplicationAnswers { get; set; }

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

            // One-to-One
            modelBuilder.Entity<User>()
                .HasOne(u => u.Profile)
                .WithOne(p => p.User)
                .HasForeignKey<Profile>(p => p.UserID);

            modelBuilder.Entity<User>()
                .HasOne(u => u.NotificationSetting)
                .WithOne(ns => ns.User)
                .HasForeignKey<NotificationSetting>(ns => ns.UserID);

            modelBuilder.Entity<Resume>()
                .HasOne(r => r.ResumeFeedback)
                .WithOne(rf => rf.Resume)
                .HasForeignKey<ResumeFeedback>(rf => rf.ResumeID);

            // One-to-Many
            modelBuilder.Entity<Profile>()
                .HasMany(p => p.UserSkills)
                .WithOne(us => us.Profile)
                .HasForeignKey(us => us.ProfileID);

            modelBuilder.Entity<Profile>()
                .HasMany(p => p.SocialLinks)
                .WithOne(sl => sl.Profile)
                .HasForeignKey(sl => sl.ProfileID);

            modelBuilder.Entity<Profile>()
                .HasMany(p => p.Portfolios)
                .WithOne(po => po.Profile)
                .HasForeignKey(po => po.ProfileID);

            modelBuilder.Entity<Profile>()
                .HasMany(p => p.Notifications)
                .WithOne(n => n.Profile)
                .HasForeignKey(n => n.ProfileID);

            modelBuilder.Entity<Profile>()
                .HasMany(p => p.UserLanguages)
                .WithOne(ul => ul.Profile)
                .HasForeignKey(ul => ul.ProfileID);

            modelBuilder.Entity<Profile>()
                .HasMany(p => p.Experiences)
                .WithOne(e => e.Profile)
                .HasForeignKey(e => e.ProfileID);

            modelBuilder.Entity<Profile>()
                .HasMany(p => p.Educations)
                .WithOne(e => e.Profile)
                .HasForeignKey(e => e.ProfileID);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Tokens)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.UserID);

            modelBuilder.Entity<User>()
                .HasMany(u => u.JobListings)
                .WithOne(j => j.User)
                .HasForeignKey(j => j.UserID);

            modelBuilder.Entity<User>()
                .HasMany(u => u.SavedJobs)
                .WithOne(sj => sj.User)
                .HasForeignKey(sj => sj.UserID);

            modelBuilder.Entity<User>()
                .HasMany(u => u.JobApplications)
                .WithOne(ja => ja.User)
                .HasForeignKey(ja => ja.UserID);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Resumes)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserID);

            modelBuilder.Entity<User>()
                .HasMany(u => u.InterviewSimulations)
                .WithOne(ins => ins.User)
                .HasForeignKey(ins => ins.UserID);

            modelBuilder.Entity<User>()
                .HasMany(u => u.HelpEntries)
                .WithOne(h => h.User)
                .HasForeignKey(h => h.UserID);

            modelBuilder.Entity<JobListing>()
                .HasMany(j => j.JobListingSkills)
                .WithOne(jls => jls.JobListing)
                .HasForeignKey(jls => jls.JobID);

            modelBuilder.Entity<JobListing>()
                .HasMany(j => j.JobListingCategories)
                .WithOne(jc => jc.JobListing)
                .HasForeignKey(jc => jc.JobID);

            modelBuilder.Entity<JobListing>()
                .HasMany(j => j.JobBenefits)
                .WithOne(jb => jb.JobListing)
                .HasForeignKey(jb => jb.JobID);

            modelBuilder.Entity<JobListing>()
                .HasMany(j => j.JobApplications)
                .WithOne(ja => ja.JobListing)
                .HasForeignKey(ja => ja.JobID);

            modelBuilder.Entity<JobListing>()
                .HasMany(j => j.SavedJobs)
                .WithOne(sj => sj.JobListing)
                .HasForeignKey(sj => sj.JobID);

            modelBuilder.Entity<JobApplicationAnswer>()
                .HasOne(a => a.JobApplication)
                .WithMany(j => j.JobApplicationAnswers)
                .HasForeignKey(a => a.ApplicationID)
                .OnDelete(DeleteBehavior.Cascade); // keep cascade here

            modelBuilder.Entity<JobApplicationAnswer>()
                .HasOne(a => a.JobListingQuestion)
                .WithMany()
                .HasForeignKey(a => a.QuestionId)
                .OnDelete(DeleteBehavior.Restrict); // or .NoAction

            // Many-to-One
            modelBuilder.Entity<JobListingSkill>()
                .HasOne(jls => jls.Skill)
                .WithMany(s => s.JobListingSkills)
                .HasForeignKey(jls => jls.SkillID);

            modelBuilder.Entity<JobListingCategory>()
                .HasOne(jc => jc.JobCategory)
                .WithMany(jlc => jlc.JobListingCategories)
                .HasForeignKey(jc => jc.CategoryID);

            modelBuilder.Entity<UserSkill>()
                .HasOne(us => us.Skill)
                .WithMany(s => s.UserSkills)
                .HasForeignKey(us => us.SkillID);

            modelBuilder.Entity<UserLanguage>()
                .HasOne(ul => ul.Language)
                .WithMany(l => l.UserLanguages)
                .HasForeignKey(ul => ul.LanguageID);
        }
    }
}
