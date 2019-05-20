using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalTest.Models;
using FinalTest.RequestModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet, Route("/products")]
        public IActionResult Get()
        {
            //access data base with awesome EF

            // grab products
            List<Product> product = new List<Product>();
            product = _context.Products.ToList();

            return Ok(product);
        }

        [HttpPut, Route("/products")]
        public IActionResult InsertOrUpdate([FromBody] NewProductRequest incomingProduct) // [FromBody] tag is a must to clarify
        {
            var newProduct = new Product();
            newProduct.ProductId = new Guid();
            newProduct.ProductName = incomingProduct.ProductName;
            newProduct.Barcode = incomingProduct.Barcode;
            newProduct.EntryDate = DateTime.Now;
            newProduct.ExpiryDate = DateTime.Now.AddDays(incomingProduct.ReservedDays);
            newProduct.IsEaten = false;
            _context.Products.Add(newProduct);
            _context.SaveChanges();
            // set header content-type json, set body raw to type json in postman

            return Ok();
        }

        [HttpGet, Route("/products/test")]
        public IActionResult CreateTestData()
        {

            var newProduct = new Product();
            newProduct.ProductId = new Guid();
            newProduct.ProductName = "salmon";
            newProduct.EntryDate = DateTime.Now;
            newProduct.ExpiryDate = DateTime.Now.AddDays(7);
            newProduct.IsEaten = false;
            _context.Products.Add(newProduct);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet, Route("/products/test1")] // fetch data with condition
        public IActionResult UpdateTestData()
        {
            var result = _context.Products.First(x => x.ProductName == "salmon"); // && x.column name
            result.IsEaten = true;
            _context.Products.Update(result);
            _context.SaveChanges();

            return Ok();
        }
    }
}
