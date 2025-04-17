using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class LanguageRepository : Repository<Language>, ILanguageRepository
    {
        public LanguageRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
