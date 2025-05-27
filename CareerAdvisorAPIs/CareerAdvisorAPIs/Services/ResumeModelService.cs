using System.Text;
using Newtonsoft.Json;
using System;
using System.Net.Http.Headers;
using CareerAdvisorAPIs.DTOs.Resume;
using Newtonsoft.Json.Linq;

namespace CareerAdvisorAPIs.Services
{
    public class ResumeAIModelService : IResumeAIModelService
    {
        public string url;
        private readonly HttpClient client = new HttpClient();

        private readonly IConfiguration _config;

        public ResumeAIModelService(IConfiguration config)
        {
            _config = config;
            url = _config.GetValue<string>("AISettings:ResumeAIModelAPI");
        }

        public async Task<ResumeAIResponseDto?> PostResumeAsync(ResumeAIRequestDto resume)
        {
            try
            {
                using var form = new MultipartFormDataContent();

                var fileStream = File.OpenRead(FileService.imageDirectory + resume.filePath);
                var fileContent = new StreamContent(fileStream);

                // Detect content type based on file extension
                string extension = Path.GetExtension(resume.filePath).ToLowerInvariant();
                string contentType = extension switch
                {
                    ".pdf" => "application/pdf",
                    ".doc" => "application/msword",
                    ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    ".txt" => "text/plain",
                    _ => "application/octet-stream"
                };

                fileContent.Headers.ContentType = new MediaTypeHeaderValue(contentType);

                form.Add(fileContent, "resume_file", Path.GetFileName(resume.filePath));
                form.Add(new StringContent(resume.jobDescription), "job_description");

                var api = url + "/score";
                var response = await client.PostAsync(api, form);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();

                    JObject data = JObject.Parse(responseContent);
                    decimal score = data["score"].Value<decimal>();
                    JObject feedbackObj = (JObject)data["feedback"];
                    string feedbackJsonString = feedbackObj.ToString(Formatting.None);

                    var feedback = new ResumeAIResponseDto { Score =  score, Feedback = feedbackJsonString };

                    return feedback;
                }
                else
                {
                    Console.WriteLine("Error: " + response.ReasonPhrase);
                    return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception: " + ex.Message);
                return null;
            }
        }
    }
}
