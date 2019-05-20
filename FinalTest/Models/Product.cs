using System;
using Microsoft.EntityFrameworkCore;
namespace FinalTest.Models
{
    public class Product
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }

        public Boolean IsEaten { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime? EntryDate { get; set; }
        public string Barcode { get; set; }

        public Guid? UserId { get; set; }
        public virtual Users User { get; set; }
    }
}
