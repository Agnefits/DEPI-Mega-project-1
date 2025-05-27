using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Repository.Interfaces;
using CareerAdvisorAPIs.Services;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly CareerAdvisorCtx _context;
        private readonly IJobAIModelService _jobAIModelService;
        
        public IUserRepository Users { get; private set; }
        public ITokenRepository Tokens { get; private set; }
        public IJobListingRepository JobListings { get; private set; }
        public IJobCategoryRepository JobCategories { get; private set; }
        public IJobListingCategoryRepository JobListingCategories { get; private set; }
        public ISkillRepository Skills { get; private set; }
        public IJobListingSkillRepository JobListingSkills { get; private set; }
        public IJobBenefitRepository JobBenefits { get; private set; }
        public ISavedJobRepository SavedJobs { get; private set; }
        public IJobApplicationRepository JobApplications { get; private set; }
        public IProfileRepository Profiles { get; private set; }
        public IPortfolioRepository Portfolios { get; private set; }
        public ILanguageRepository Languages { get; private set; }
        public IUserLanguageRepository UserLanguages { get; private set; }
        public IUserSkillRepository UserSkills { get; private set; }
        public ISocialLinkRepository SocialLinks { get; private set; }
        public IExperienceRepository Experiences { get; private set; }
        public IEducationRepository Educations { get; private set; }
        public IResumeRepository Resumes { get; private set; }
        public IResumeFeedbackRepository ResumeFeedbacks { get; private set; }
        public IInterviewSimulationRepository InterviewSimulations { get; private set; }
        public INotificationRepository Notifications { get; private set; }
        public INotificationSettingRepository NotificationSettings { get; private set; }
        public IHelpRepository HelpRequests { get; private set; }

        public UnitOfWork(CareerAdvisorCtx context, IJobAIModelService jobAIModelService)
        {
            _context = context;
            _jobAIModelService = jobAIModelService;

            Users = new UserRepository(context);
            Tokens = new TokenRepository(context);
            JobListings = new JobListingRepository(context, jobAIModelService);
            JobCategories = new JobCategoryRepository(context);
            JobListingCategories = new JobListingCategoryRepository(context);
            Skills = new SkillRepository(context);
            JobListingSkills = new JobListingSkillRepository(context);
            JobBenefits = new JobBenefitRepository(context);
            SavedJobs = new SavedJobRepository(context);
            JobApplications = new JobApplicationRepository(context);
            Profiles = new ProfileRepository(context);
            Portfolios = new PortfolioRepository(context);
            Languages = new LanguageRepository(context);
            UserLanguages = new UserLanguageRepository(context);
            UserSkills = new UserSkillRepository(context);
            SocialLinks = new SocialLinkRepository(context);
            Experiences = new ExperienceRepository(context);
            Educations = new EducationRepository(context);
            Resumes = new ResumeRepository(context);
            ResumeFeedbacks = new ResumeFeedbackRepository(context);
            InterviewSimulations = new InterviewSimulationRepository(context);
            Notifications = new NotificationRepository(context);
            NotificationSettings = new NotificationSettingRepository(context);
            HelpRequests = new HelpRepository(context);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }

}
