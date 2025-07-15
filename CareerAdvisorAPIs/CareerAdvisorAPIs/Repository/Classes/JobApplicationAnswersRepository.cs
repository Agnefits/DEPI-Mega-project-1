using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class JobApplicationAnswerRepository :  Repository<JobApplicationAnswer>, IJobApplicationAnswerRepository
    {
        public JobApplicationAnswerRepository(CareerAdvisorCtx context):base(context){ }
    }
} 