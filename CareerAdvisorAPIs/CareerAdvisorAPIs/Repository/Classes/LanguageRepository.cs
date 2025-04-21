using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class LanguageRepository : Repository<Language>, ILanguageRepository
    {
        public LanguageRepository(CareerAdvisorCtx context) : base(context) { }

        public async Task<Language?> GetByNameAsync(string name)
        {
            return await _context.Languages.FirstOrDefaultAsync(x => x.Name == name);
        }
    }
}
