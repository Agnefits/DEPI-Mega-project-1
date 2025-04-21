using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class UserLanguageRepository : Repository<UserLanguage>, IUserLanguageRepository
    {
        public UserLanguageRepository(CareerAdvisorCtx context) : base(context) { }

        public async Task<UserLanguage?> GetByProfileAndLanguageIdAsync(int profileId, int languageId)
        {
            return await _context.UserLanguages
                .FirstOrDefaultAsync(ul => ul.ProfileID == profileId && ul.LanguageID == languageId);
        }

        public async Task<bool> Delete(int profileId, int languageId)
        {
            var userLanguage = await _context.UserLanguages
                                        .FirstOrDefaultAsync(ul => ul.ProfileID == profileId && ul.LanguageID == languageId);
            if (userLanguage == null)
                return false;
            _context.UserLanguages.Remove(userLanguage);
            return true;
        }
    }
}
