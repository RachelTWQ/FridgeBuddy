using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalTest.Models;
using FinalTest.RequestModels;
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
        // ??? React component
        [HttpGet, Route("/register")]
        public IActionResult GetUserForm()
        {
            return Ok();
        }

        [HttpPost, Route("/register")]
        public IActionResult CreateUser()
        {
            User newUser = new User();
            return Ok();
        }
    }
}
