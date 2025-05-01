using System;
using System.ComponentModel.DataAnnotations;

namespace CareerAdvisorAPIs.DTOs.Resume
{
    public class ResumeResponseDto
    {
        public int ResumeID { get; set; }
        public string File { get; set; }
        public string FileName { get; set; }
        public string JobDescription { get; set; }
        public DateTime Date { get; set; }
        public decimal Score { get; set; }
        public string FeedbackText { get; set; }
    }
}
