namespace CareerAdvisorAPIs.Services
{
    public static class RandomCodeService
    {
        public static string GenerateFiveDigitCode()
        {
            Random random = new Random();
            int number = random.Next(0, 100000); // from 00000 to 99999
            return number.ToString("D5"); // Format with leading zeros
        }
    }
}
