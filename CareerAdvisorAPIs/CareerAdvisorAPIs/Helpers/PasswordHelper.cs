using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace CareerAdvisorAPIs.Helpers
{
    public static class PasswordHelper
    {
        public static string HashPassword(string password)
        {
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 32));

            return Convert.ToBase64String(salt) + ":" + hashed;
        }

        public static bool VerifyPassword(string password, string storedHash)
        {
            var parts = storedHash.Split(':');
            var salt = Convert.FromBase64String(parts[0]);
            var hashed = parts[1];

            string newHashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 32));

            return hashed == newHashed;
        }
    }

}
