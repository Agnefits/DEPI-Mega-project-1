using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class SkillRepository : Repository<Skill>, ISkillRepository
    {
        public SkillRepository(CareerAdvisorCtx context) : base(context) { }

        public async Task<Skill?> GetByNameAsync(string name)
        {
            return await _context.Skills.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        }
    }
}
