using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalTest.Models;
using FinalTest.RequestModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinalTest.Controllers
{
    [EnableCors("default")] // Add this line to all controller
    public class ProductsController : Controller
    {
        private readonly FbContext _context;

        public ProductsController(FbContext context)
        {
            _context = context;
        }

        [HttpGet, Route("/{userId}/products")]
        public IActionResult GetProducts(Guid userId)
        {
            //access data base with awesome EF

            // grab products
            List<Product> products = new List<Product>();
            products = _context.Products.Where(x => x.UserId == userId).ToList();

            return Ok(products);
        }

        // scan to find product with barcode in product table
        [HttpGet, Route ("/{userId}/product/{barcode}")]
        public IActionResult FindProductByBarcode(Guid userId, string barcode)
        {
            Product product = _context.Products.FirstOrDefault(x => x.Barcode == barcode && x.UserId == userId);
            return Ok(product);
        }

        // update particular product info Put or get???
        [HttpPut, Route("{userId}/products/{productId}")]
        public IActionResult UpdateProductCategoryById(Guid userId, Guid productId, [FromBody] UpdateProductRequest incomingInfo)
        {
            Product product = _context.Products.FirstOrDefault(x => x.ProductId == productId && x.UserId == userId);
            if (incomingInfo.ProductName != "")
            {
                product.ProductName = incomingInfo.ProductName;
            }
            if (incomingInfo.Category != "")
            {
                product.Category = incomingInfo.Category;
            }
               
            _context.Products.Update(product);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet, Route("/products/test")]
        public IActionResult CreateTestData()
        {

            var newProduct = new Product();
            newProduct.ProductId = new Guid();
            newProduct.Barcode = "3333";
            newProduct.Category = "seafood";
            newProduct.ProductName = "sausage";
            _context.Products.Add(newProduct);

            var user = new User();
            user.UserId = new Guid();
            user.Name = "Jojo";
            user.Email = "dennischeng1234+fake@gmail.com";
            user.Password = "password";
            user.PhoneNumber = "333333232";
            _context.Users.Add(user);


            Notification notifcation = new Notification();
            notifcation.NotificationId = new Guid();
            notifcation.ProductId = newProduct.ProductId;
            notifcation.UserId = user.UserId;
            notifcation.EntryDate = DateTime.Now;
            notifcation.ExpiryDate = DateTime.Now.AddDays(2);
            notifcation.IsEaten = false;
            notifcation.Note = "Remebeber to use chocolate dip before eating!Remember to buy more!";
            _context.Notifications.Add(notifcation);
            _context.SaveChanges();
            return Ok();
        }



        [HttpGet, Route("/products/test1")] // fetch data with condition
        public IActionResult UpdateTestData()
        {
            //var result = _context.Inventories.First(x => x.ProductName == "salmon"); // && x.column name
            //result.IsEaten = true;
            //_context.Inventories.Update(result);
            //_context.SaveChanges();

            return Ok();
        }
    }
}
