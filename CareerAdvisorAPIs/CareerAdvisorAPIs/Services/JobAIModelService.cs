using CareerAdvisorAPIs.DTOs.JobListing;
using System.Text;
using Newtonsoft.Json;
using System;

namespace CareerAdvisorAPIs.Services
{
    public class JobAIModelService : IJobAIModelService
    {
        public string url;
        private readonly HttpClient client = new HttpClient();

        private readonly IConfiguration _config;

        public JobAIModelService(IConfiguration config)
        {
            _config = config;
            url = _config.GetValue<string>("AISettings:JobAIModelAPI");
        }

        public async Task<JobAIResponseDto?> PostJobAsync(JobAIRequestDto job)
        {
            try
            {
                var api = url + "/ingest/job";
                var jsonContent = JsonConvert.SerializeObject(job);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(api, content);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var embeddingResponse = JsonConvert.DeserializeObject<JobAIResponseDto>(responseContent);
                    return embeddingResponse;
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

        public async Task<UserAIResponseDto?> PostUserAsync(UserAIRequestDto user)
        {
            try
            {
                var api = url + "/ingest/user";
                var jsonContent = JsonConvert.SerializeObject(user);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(api, content);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var embeddingResponse = JsonConvert.DeserializeObject<UserAIResponseDto>(responseContent);
                    return embeddingResponse;
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
        
        public async Task<RecommenderAIResponseDto?> PostRecommenderAsync(RecommenderAIRequestDto request)
        {
            try
            {
                var api = url + "/recommend";
                var jsonContent = JsonConvert.SerializeObject(request);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(api, content);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var recommendResponse = JsonConvert.DeserializeObject<RecommenderAIResponseDto>(responseContent);
                    return recommendResponse;
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
