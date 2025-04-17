using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class TokenRepository : Repository<Token>, ITokenRepository
    {
        public TokenRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
