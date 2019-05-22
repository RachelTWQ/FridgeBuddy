using System;
namespace FinalTest.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
