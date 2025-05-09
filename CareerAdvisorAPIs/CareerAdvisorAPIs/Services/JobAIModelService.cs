using CareerAdvisorAPIs.DTOs.JobListing;
using System.Text;
using Newtonsoft.Json;

namespace CareerAdvisorAPIs.Services
{
    public static class JobAIModelService
    {
        public static string url = "https://4853-102-45-205-115.ngrok-free.app";
        private static readonly HttpClient client = new HttpClient();
        public static async Task<JobAIResponseDto?> PostJobAsync(JobAIRequestDto job)
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

        public static async Task<UserAIResponseDto?> PostUserAsync(UserAIRequestDto job)
        {
            try
            {
                var api = url + "/ingest/user";
                var jsonContent = JsonConvert.SerializeObject(job);
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
    }
}
