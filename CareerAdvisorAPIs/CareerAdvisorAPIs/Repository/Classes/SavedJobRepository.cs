using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class SavedJobRepository : Repository<SavedJob>, ISavedJobRepository
    {
        public SavedJobRepository(CareerAdvisorCtx context) : base(context) { }
    }
}
