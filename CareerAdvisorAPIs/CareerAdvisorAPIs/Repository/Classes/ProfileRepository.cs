using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class ProfileRepository : Repository<Profile>, IProfileRepository
    {
        public ProfileRepository(CareerAdvisorCtx context) : base(context) { }

        public Task<Profile?> GetByUserIdAsync(int userId)
        {
            return _context.Profiles
                .Include(p => p.User)
                .Include(p => p.UserSkills).ThenInclude(us => us.Skill)
                .Include(p => p.SocialLinks)
                .Include(p => p.UserLanguages).ThenInclude(ul => ul.Language)
                //.Include(p => p.Portfolios)
                //.Include(p => p.Notifications)
                //.Include(p => p.Experiences)
                //.Include(p => p.Educations)
                .FirstOrDefaultAsync(p => p.UserID == userId);
        }
    }
}
