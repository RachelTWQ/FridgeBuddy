using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalTest.Models;
using FinalTest.RequestModels;
using FinalTest.ResponseModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Net.Mail;

namespace FinalTest.Controllers
{
    [EnableCors("default")] // Add this line to all controller
    public class NotificationsController : Controller
    {
        private readonly FbContext _context;

        public NotificationsController(FbContext context)
        {
            _context = context;
        }

        // display all non-isEaten products from the user 
        [HttpGet, Route("/{userId}/notifications")]
        public IActionResult GetUserNotifications(Guid userId)
        {
            List<Notification> notifcations = _context.Notifications.Include(x => x.Product).Include(x => x.User).Where(x => x.UserId == userId && x.IsEaten == false).OrderBy(x => x.ExpiryDate).ToList();
            List<NotificationResponse> responses = new List<NotificationResponse>();
            foreach(var notification in notifcations)
            {
                var response = new NotificationResponse();
                response.NotificationId = notification.NotificationId;
                response.EntryDate = notification.EntryDate.Value.ToShortDateString();
                response.ExpiryDateString = notification.ExpiryDate.Value.ToShortDateString();
                response.ExpiryDate = notification.ExpiryDate;
                response.Note = notification.Note;
                response.ProductName = notification.Product.ProductName;
                response.Category = notification.Product.Category;
                response.Name = notification.User.Name;
                response.Barcode = notification.Product.Barcode;
                responses.Add(response);
            }
            return Ok(responses);
        }

        // this is to save the notification after scanning. whether we found it or not. we create product here as well.
        [HttpPost, Route("/{userId}/notification")]
        public IActionResult InsertNewNotification(Guid userId, [FromBody] NewProductRequest incomingProduct) // [FromBody] tag is a must to clarify
        {
            var productId = Guid.NewGuid();
            if (incomingProduct.newProduct)
            {
                var newProduct = new Product();
                newProduct.ProductId = productId;
                newProduct.Barcode = incomingProduct.Barcode;
                newProduct.Category = incomingProduct.Category;
                newProduct.ProductName = incomingProduct.ProductName;
                newProduct.UserId = userId;

                _context.Products.Add(newProduct);
            }
            else if (incomingProduct.productId != null)
            {
                productId = incomingProduct.productId.Value;

                Product product = _context.Products.FirstOrDefault(x => x.ProductId == productId && x.UserId == userId);
                if (incomingProduct.ProductName != "" && incomingProduct.ProductName != product.ProductName)
                {
                    product.ProductName = incomingProduct.ProductName;
                }
                if (incomingProduct.Category != "" && incomingProduct.Category != product.Category)
                {
                    product.Category = incomingProduct.Category;
                }

                _context.Products.Update(product);
            }
            else
            {
                productId = _context.Products.Where(x => x.ProductName == incomingProduct.ProductName).First().ProductId;
            }

            Notification notifcation = new Notification();
            notifcation.NotificationId = new Guid();
            notifcation.ProductId = productId;
            notifcation.UserId = userId;
            notifcation.EntryDate = DateTime.Now;
            notifcation.ExpiryDate = DateTime.Now.AddDays(incomingProduct.ReservedDays);
            notifcation.IsEaten = false;
            notifcation.Note = incomingProduct.Note;
            _context.Notifications.Add(notifcation);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut, Route("/{userId}/notification/{notificationId}")]
        public IActionResult UpdateIsEaten(Guid userId, Guid notificationId)
        {
            Notification notification = _context.Notifications.FirstOrDefault(x => x.NotificationId == notificationId);
            notification.IsEaten = true;
            _context.Notifications.Update(notification);
            _context.SaveChanges();

            return Ok();
        }

        private void SendSMS(string content, string phoneNumber)
        {
            DotNetEnv.Env.Load("./.env");
            var accountSid = System.Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
            var authToken = System.Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");
            var twilioNumber = System.Environment.GetEnvironmentVariable("TWILIO_NUMBER"); 

            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Create(
                body: content,
                from: new Twilio.Types.PhoneNumber(twilioNumber),
                to: new Twilio.Types.PhoneNumber($"+1{phoneNumber}")
            );
            Console.WriteLine(message.Sid);
        }

        //private void SendEmail(string content, string email)
        //{
        //    MailMessage mail = new MailMessage("admin@fridgebuddy.com", email);
        //    SmtpClient client = new SmtpClient();
        //    client.Port = 25;
        //    client.DeliveryMethod = SmtpDeliveryMethod.Network;
        //    client.UseDefaultCredentials = false;
        //    client.Host = "smtp.gmail.com";
        //    mail.Subject = "Fridge Buddy Notification";
        //    mail.Body = content;
        //    client.Send(mail);
        //}

        [HttpGet, Route("/notifications")]
        public IActionResult SendNotification()
        {

            List<Notification> notifcations = _context.Notifications.Include(x => x.Product).Include(x => x.User).Where(x => x.ExpiryDate <= DateTime.Now && x.IsEaten == false).ToList();

            Dictionary<string, List<SendResponse>> smsDictonary = new Dictionary<string, List<SendResponse>>();
            foreach (var notification in notifcations)
            {
                var response = new SendResponse();

                response.ProductName = notification.Product.ProductName;
                response.Name = notification.User.Name;
                response.Email = notification.User.Email;
                response.PhoneNumber = notification.User.PhoneNumber;
                if (!smsDictonary.ContainsKey(notification.User.PhoneNumber))
                {
                    smsDictonary.Add(notification.User.PhoneNumber, new List<SendResponse>());
                }
                smsDictonary[notification.User.PhoneNumber].Add(response);
            }

            foreach (var phoneNumber in smsDictonary.Keys)
            {
                var screeningResult = String.Join(", ", smsDictonary[phoneNumber].Select(x => x.ProductName).ToArray());
                Console.WriteLine(screeningResult);
                string content = $"Hello {smsDictonary[phoneNumber][0].Name}, you set to finish eating {screeningResult} today. Take a look into your fridge!";
                SendSMS(content, phoneNumber);
               //SendEmail(content, smsDictonary[phoneNumber][0].Email);
            }
            return Ok(smsDictonary);
        }
    }
}
