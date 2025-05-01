using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Resume
{
    public class ResumeDto
    {
        [Required]
        public IFormFile File { get; set; }
        [Required]
        public string FileName { get; set; }
        [Required]
        public string JobDescription { get; set; }
    }
}

