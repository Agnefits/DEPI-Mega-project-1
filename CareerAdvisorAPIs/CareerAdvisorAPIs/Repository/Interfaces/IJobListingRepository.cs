using CareerAdvisorAPIs.DTOs.JobListing;
using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface IJobListingRepository : IRepository<JobListing>
    {
        Task<IEnumerable<JobListing>> GetDetailedAllAsync(int skip = 0, int limit = 100);
        Task<IEnumerable<JobListing>> GetByUserIdAsync(int userId);
        Task<JobListing?> GetDetailedByIdAsync(int jobId);

        Task AddAsync(JobListing job, List<string> categories, List<string> skills, List<JobBenefit> benefits);
        Task UpdateAsync(JobListing job, List<string> categories, List<string> skills, List<JobBenefit> benefits);

        Task<int> CountSearchAsync(string keyword, string? country, string? city);
        Task<int> CountFilterAsync(FilterJobListingDto dto);
        Task<IEnumerable<JobListing>> SearchAsync(string keyword, string? country, string? city, int skip = 0, int limit = 20, string sort = null);
        Task<IEnumerable<JobListing>> FilterAsync(FilterJobListingDto dto, int skip = 0, int limit = 20, string sort = null);
        Task<IEnumerable<JobListing>> RecommendAsync(int userId);
        Task<IEnumerable<CategoryJobCountDto>> GetCategoryJobCountsAsync();
        Task<int> CountAllAsync();
    }

}
