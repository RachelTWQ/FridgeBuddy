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

        public DbSet<Product> Products { get; set; }
        public DbSet<Users> Users { get; set; }

    }
}
