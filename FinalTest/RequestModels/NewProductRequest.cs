using System;
namespace FinalTest.RequestModels
{
    public class NewProductRequest
    {
        public bool newProduct { get; set; }
        public Guid? productId { get; set; }
        public string ProductName { get; set; }
        public string Barcode { get; set; }
        public string Category { get; set; }
        public int ReservedDays { get; set; } // When to remind use
    }
}
