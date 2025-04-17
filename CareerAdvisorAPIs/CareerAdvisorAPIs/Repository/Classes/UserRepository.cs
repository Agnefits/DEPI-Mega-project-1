using CareerAdvisorAPIs.Data;
using CareerAdvisorAPIs.Models;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerAdvisorAPIs.Repository.Classes
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(CareerAdvisorCtx context) : base(context) { }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email != null && u.Email.ToLower() == email.ToLower());
        }
        public async Task<Token?> GetLastTokenByEmailAndNameAsync(string email, string tokenName)
        {
            return await _context.Tokens
                .Where(t => t.User != null
                            && t.User.Email.ToLower() == email.ToLower()
                            && t.TokenName == tokenName)
                .OrderByDescending(t => t.ExpireDate)
                .FirstOrDefaultAsync();
        }

    }
}
