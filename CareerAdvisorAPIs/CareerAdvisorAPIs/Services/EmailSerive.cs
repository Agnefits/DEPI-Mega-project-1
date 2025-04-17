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

        public async Task<bool> SendEmailAsync(string toEmail, string subject, string body, bool isHtml = true)
        {
            bool status = false;
            try
            {
                string HostAddress = _config.GetValue<string>("EmailSettings:HostAddress");
                string FromEmail = _config.GetValue<string>("EmailSettings:MailFrom");
                string Password = _config.GetValue<string>("EmailSettings:Password");
                string Port = _config.GetValue<string>("EmailSettings:Port");

                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(FromEmail);
                mailMessage.Subject = subject;
                mailMessage.Body = body;
                mailMessage.IsBodyHtml = isHtml;
                mailMessage.To.Add(toEmail);

                SmtpClient smtpClient = new SmtpClient { Host = HostAddress, EnableSsl = true };
                NetworkCredential networkCredential = new NetworkCredential(FromEmail, Password);

                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = networkCredential;
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.Port = Convert.ToInt32(Port);
                smtpClient.Send(mailMessage);

                status = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return status;
        }
    }
}
