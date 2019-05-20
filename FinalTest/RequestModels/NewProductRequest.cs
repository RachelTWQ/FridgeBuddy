using System;
namespace FinalTest.RequestModels
{
    public class NewProductRequest
    {
        public string ProductName { get; set; }
        public string Barcode { get; set; }
        public int ReservedDays { get; set; } // Days before expiration
    }
}
