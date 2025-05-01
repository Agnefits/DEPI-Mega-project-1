using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class ResumeRepository : Repository<Resume>, IResumeRepository
    {
        public ResumeRepository(CareerAdvisorCtx context) : base(context) { }

        public async Task<IEnumerable<Resume>> GetAllResumesByUserId(int userId)
        {
            return await _context.Resumes
                .Where(r => r.UserID == userId)
                .Include(r => r.ResumeFeedback)
                .ToListAsync();
        }
        public async Task<Resume?> GetResumeWithFeedback(int resumeId)
        {
            return await _context.Resumes
                .Include(r => r.ResumeFeedback)
                .FirstOrDefaultAsync(r => r.ResumeID == resumeId);
        }
    }
}
