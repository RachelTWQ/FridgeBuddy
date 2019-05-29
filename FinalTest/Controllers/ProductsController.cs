using System;
using RestSharp;
using Newtonsoft.Json;
using Microsoft.CSharp;
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
        [HttpPut, Route("{userId}/product/{productId}")]
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

        private static Object UpcLookup(string barcode)
        {

            var client = new RestClient("https://api.upcitemdb.com/prod/trial/");
            // lookup request with GET
            var request = new RestRequest("lookup", Method.GET);

            request.AddQueryParameter("upc", barcode);
            IRestResponse response = client.Execute(request);
            // parsing json
            var obj = JsonConvert.DeserializeObject(response.Content);
            Console.WriteLine("offset", obj);
            return obj;
        }

        [HttpGet, Route("/product/{barcode}")]
        public IActionResult FetchDB(string barcode)
        {
            var response = UpcLookup(barcode);
            Console.WriteLine("done fetching");
            return Ok(response);
        }
    }
}
