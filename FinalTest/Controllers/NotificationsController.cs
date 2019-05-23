using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalTest.Models;
using FinalTest.RequestModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


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
        [HttpGet, Route("/{userId}/notifications/")]
        public IActionResult GetUserNotifications(Guid userId)
        {
            List<Notification> notifcations = _context.Notifications.Include(x => x.Product).Include(x => x.User).Where(x => x.UserId == userId && x.IsEaten == false).ToList();
            return Ok(notifcations);
        }

        // this is to save the notification after scanning. whether we found it or not. we create product here as well.
        [HttpPost, Route("/{userId}/notifications")]
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
                _context.Products.Add(newProduct);
            }
            else if (incomingProduct.productId != null)
            {
                productId = incomingProduct.productId.Value;
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
            //notifcation.Note = "Remebeber to use chocolate dip before eating!Remember to buy more!";
            _context.Notifications.Add(notifcation);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut, Route("/{userId}/notifications/{notificationId}")]
        public IActionResult UpdateIsEaten(Guid userId, Guid notificationId)
        {
            Notification notifcation = _context.Notifications.FirstOrDefault(x => x.NotificationId == notificationId);
            notifcation.IsEaten = true;
            _context.Notifications.Update(notifcation);
            _context.SaveChanges();

            return Ok();
        }

    }
}
