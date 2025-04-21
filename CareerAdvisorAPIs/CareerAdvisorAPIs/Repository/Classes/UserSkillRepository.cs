using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class UserSkillRepository : Repository<UserSkill>, IUserSkillRepository
    {
        public UserSkillRepository(CareerAdvisorCtx context) : base(context) { }

        public async Task<UserSkill?> GetByProfileAndSkillIdAsync(int profileId, int skillId)
        {
            return await _context.UserSkills
                .FirstOrDefaultAsync(us => us.ProfileID == profileId && us.SkillID == skillId);
        }

        public async Task<bool> Delete(int profileId, int skillId)
        {
            var userSkill = await _context.UserSkills
                                             .FirstOrDefaultAsync(us => us.ProfileID == profileId && us.SkillID == skillId);
            if (userSkill == null)
                return false;
            _context.UserSkills.Remove(userSkill);
            return true;
        }
    }
}
