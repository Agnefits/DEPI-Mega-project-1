using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class JobListingQuestionRepository : Repository<JobListingQuestion>, IJobListingQuestionRepository
    {
        public JobListingQuestionRepository(CareerAdvisorCtx context) : base(context) { }
    }
}