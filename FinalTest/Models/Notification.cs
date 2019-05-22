using System;
using Microsoft.EntityFrameworkCore;
namespace FinalTest.Models
{
    public class Inventory
    {
        public Guid ProductId { get; set; }
        public virtual Product Product { get; set; } // foreign key

        public Boolean IsEaten { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime? EntryDate { get; set; }

        public Guid? UserId { get; set; }
        public virtual User User { get; set; }
    }
}
