using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class ProfileRepository : Repository<Profile>, IProfileRepository
    {
        public ProfileRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
