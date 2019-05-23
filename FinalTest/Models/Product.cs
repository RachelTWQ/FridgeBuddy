using System;
namespace FinalTest.Models
{
    public class Product
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public string Barcode { get; set; }
        public string Category { get; set; }

        public Guid? UserId { get; set; }
        public virtual User User { get; set; }
    }
}
