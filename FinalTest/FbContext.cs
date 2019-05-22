using System;
using FinalTest.Models;
using Microsoft.EntityFrameworkCore;

namespace FinalTest
{
    public class FbContext :DbContext
    {

        public FbContext(DbContextOptions<FbContext> options) : base(options)
        {
        }

        public DbSet<Notification> Notifications { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
