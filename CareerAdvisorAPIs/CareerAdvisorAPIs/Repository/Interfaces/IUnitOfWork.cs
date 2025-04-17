namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        ITokenRepository Tokens { get; }
        IJobListingRepository JobListings { get; }
        IJobCategoryRepository JobCategories { get; }
        IJobListingCategoryRepository JobListingCategories { get; }
        ISkillRepository Skills { get; }
        IJobListingSkillRepository JobListingSkills { get; }
        IJobBenefitRepository JobBenefits { get; }
        ISavedJobRepository SavedJobs { get; }
        IJobApplicationRepository JobApplications { get; }
        IProfileRepository Profiles { get; }
        IPortfolioRepository Portfolios { get; }
        ILanguageRepository Languages { get; }
        IUserLanguageRepository UserLanguages { get; }
        IUserSkillRepository UserSkills { get; }
        ISocialLinkRepository SocialLinks { get; }
        IExperienceRepository Experiences { get; }
        IEducationRepository Educations { get; }
        IResumeRepository Resumes { get; }
        IResumeFeedbackRepository ResumeFeedbacks { get; }
        IInterviewSimulationRepository InterviewSimulations { get; }
        INotificationRepository Notifications { get; }
        INotificationSettingRepository NotificationSettings { get; }
        IHelpRepository HelpRequests { get; }
        Task SaveAsync();
    }

}
