using System;
namespace FinalTest.RequestModels
{
    public class RegisterRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PasswordRepeat { get; set; }
        public string PhoneNumber { get; set; }
    }
}
