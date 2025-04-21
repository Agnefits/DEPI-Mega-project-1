using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface IUserLanguageRepository : IRepository<UserLanguage>
    {
        Task<UserLanguage?> GetByProfileAndLanguageIdAsync(int profileId, int languageId);
        Task<bool> Delete(int profileId, int languageId);
    }

}
