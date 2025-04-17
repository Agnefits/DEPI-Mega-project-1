using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class UserLanguageRepository : Repository<UserLanguage>, IUserLanguageRepository
    {
        public UserLanguageRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
