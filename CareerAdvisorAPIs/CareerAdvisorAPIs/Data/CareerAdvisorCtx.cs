using CareerAdvisorAPIs.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace CareerAdvisorAPIs.Data
{
    public class CareerAdvisorCtx : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<CertificationCourse> CertificationsCourses { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<HonorAchievement> HonorsAchievements { get; set; }
        public DbSet<VolunteerExperience> VolunteerExperiences { get; set; }
        public DbSet<Cause> Causes { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<JobRecommendation> JobRecommendations { get; set; }
        public DbSet<ResumeFeedback> ResumeFeedbacks { get; set; }
        public DbSet<InterviewSimulation> InterviewSimulations { get; set; }
        public DbSet<JobMarketTrend> JobMarketTrends { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                    .SetBasePath(AppContext.BaseDirectory) // Ensures the correct path
                    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                    .Build();

                string connectionString = configuration.GetConnectionString("DefaultConnection"); // Use the correct key name
                if (string.IsNullOrEmpty(connectionString))
                {
                    throw new InvalidOperationException("Database connection string is missing.");
                }

                optionsBuilder.UseSqlServer(connectionString);
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }

}
