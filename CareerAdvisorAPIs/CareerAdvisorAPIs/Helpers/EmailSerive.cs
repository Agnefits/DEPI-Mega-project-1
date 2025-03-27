using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace CareerAdvisorAPIs.Helpers
{
    public class EmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            try
            {
                var client = new SmtpClient(_config["Email:SmtpServer"]);
                client.Port = int.Parse(_config["Email:Port"]);
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(_config["Email:Username"], _config["Email:Password"]);
                client.EnableSsl = true;

                var mailMessage = new MailMessage
                (
                    _config["Email:Username"], toEmail,
                    subject,
                    body
                );
                mailMessage.IsBodyHtml = true;

                await client.SendMailAsync(mailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}
