using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using FinalTest.Models;
using FinalTest.RequestModels;
using FinalTest.ResponseModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace FinalTest.Controllers
{
    [EnableCors("default")] // Add this line to all controller
    public class UsersController : Controller
    {
        private readonly FbContext _context;

        public UsersController(FbContext context)
        {
            _context = context;
        }

        [HttpPost, Route("/register")]
        public IActionResult CreateUser([FromBody] RegisterRequest userInfo)
        {
            var UserId = Guid.NewGuid();
            if (userInfo.Password == userInfo.PasswordRepeat)
            {

                User newUser = new User();
                newUser.UserId = UserId;
                newUser.Name = userInfo.Name;
                newUser.Email = userInfo.Email;
                newUser.PhoneNumber = userInfo.PhoneNumber;

                //Hash password
                var md5 = new MD5CryptoServiceProvider();

                ///first we convert the text to bytes first
                var bytePassword = Encoding.ASCII.GetBytes(userInfo.Password);

                //this is the hash password
                var newHashPassword = md5.ComputeHash(bytePassword);


                //apparently we need to do this to convert to a properly string

                // save
                newUser.Password = HashString(newHashPassword);

                _context.Users.Add(newUser);
                _context.SaveChanges();

            }
            else
            {
                return StatusCode(400); //bad request
            }
            // fetch back the created user info
            var user = _context.Users.First(x => x.UserId == UserId);
            var response = new UserResponse();
            response.UserId = user.UserId;
            response.Name = user.Name;
            return Ok(response);
        }

        // this is a function that convert an array of bytes into a string of hex values
        private string HashString(byte[] byteArray)
        {
            StringBuilder builder = new StringBuilder();
            foreach(byte t in byteArray)
            {
                // the X2 converts each btye into a hex value;
                builder.Append(t.ToString("x2"));
            }

            return builder.ToString();
        }

        [HttpPut, Route("/login")]
        public IActionResult Login([FromBody] LoginRequest loginInfo)
        {
            //Hash password
            var md5 = new MD5CryptoServiceProvider();

            ///first we convert the text to bytes first
            var bytePassword = Encoding.ASCII.GetBytes(loginInfo.Password);

            //this is the hash password
            var newHashPassword = md5.ComputeHash(bytePassword);

            //convert back to string 
            var hashPasswordString = HashString(newHashPassword);

            // use this passwordString to find user
            var user = _context.Users.FirstOrDefault(x => x.Email == loginInfo.Email && x.Password == hashPasswordString);
            if (user == null)
                return StatusCode(401); //fail to authenicate

            //return something without the password lolol.
            var response = new UserResponse();
            response.UserId = user.UserId;
            response.Name = user.Name;
            return Ok(response);
        }
        // probrobally not needed
        [HttpPost, Route("/logout")]
        public IActionResult Logout()
        {
            return Ok();
        }
    }

}


