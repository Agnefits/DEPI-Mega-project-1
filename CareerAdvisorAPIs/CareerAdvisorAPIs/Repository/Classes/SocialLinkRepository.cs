using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class SocialLinkRepository : Repository<SocialLink>, ISocialLinkRepository
    {
        public SocialLinkRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
