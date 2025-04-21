using CareerAdvisorAPIs.Models;

namespace CareerAdvisorAPIs.Services
{
    public static class FileService
    {
        public static readonly string imageDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "files");

        public static async Task<string> SaveFile(string path, IFormFile file)
        {
            if (file == null)
                return string.Empty;

            // Combine the full directory path
            var fullDirPath = Path.Combine(imageDirectory, path);

            // Ensure the full directory exists
            if (!Directory.Exists(fullDirPath))
            {
                Directory.CreateDirectory(fullDirPath);
            }

            var originalFileName = Path.GetFileNameWithoutExtension(file.FileName);
            var extension = Path.GetExtension(file.FileName);
            var fileName = file.FileName;
            var filePath = Path.Combine(fullDirPath, fileName);
            int count = 1;

            // Generate a unique filename if one already exists
            while (File.Exists(filePath))
            {
                fileName = $"{originalFileName}({count}){extension}";
                filePath = Path.Combine(fullDirPath, fileName);
                count++;
            }

            // Save the file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Return the relative web path
            return $"/{path.Replace("\\", "/")}/{fileName}";
        }

        public static bool DeleteFile(string path)
        {
            // Combine the full path
            var fullDirPath = Path.Combine(imageDirectory, path.Substring(1));

            if (File.Exists(fullDirPath))
            {
                File.Delete(fullDirPath);
                return true;
            }
            else
                return false;
        }
    }
}
