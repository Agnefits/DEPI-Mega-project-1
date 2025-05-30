﻿using CareerAdvisorAPIs.DTOs.JobListing;
using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Repository.Interfaces
{
    public interface IJobListingRepository : IRepository<JobListing>
    {
        Task<IEnumerable<JobListing>> GetDetailedAllAsync();
        Task<IEnumerable<JobListing>> GetByUserIdAsync(int userId);
        Task<JobListing?> GetDetailedByIdAsync(int jobId);

        Task AddAsync(JobListing job, List<string> categories, List<string> skills, List<JobBenefit> benefits);
        Task UpdateAsync(JobListing job, List<string> categories, List<string> skills, List<JobBenefit> benefits);

        Task<IEnumerable<JobListing>> SearchAsync(string keyword, string? country, string? city);
        Task<IEnumerable<JobListing>> FilterAsync(FilterJobListingDto dto);
        Task<IEnumerable<JobListing>> RecommendAsync(int userId);
        Task<IEnumerable<CategoryJobCountDto>> GetCategoryJobCountsAsync();
    }

}
