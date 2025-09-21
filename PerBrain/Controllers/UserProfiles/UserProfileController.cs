using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using PerBrain.Model;
using PerBrain.Model.UserProfiles;
using System.Security.Cryptography.X509Certificates;

namespace PerBrain.Controllers.UserProfiles
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("allowCors")]
    public class UserProfileController : ControllerBase
    {
        private readonly PerBrainDbContext _context;

        public UserProfileController(PerBrainDbContext context)
        {
            _context = context;
        }

        [HttpPost("CreateNewUser")]
        public IActionResult CreateUser(UserProfile obj)
        {
            var userExistWithEmail = _context.UserProfiles.SingleOrDefault(m => m.Email == obj.Email);
            if (userExistWithEmail == null)
            {
                obj.UserId = 0;
                _context.UserProfiles.Add(obj);
                _context.SaveChanges();
                return Created("User registered successfully", obj);
            } else
            {
                return StatusCode(500, "Email is already registered for another user.");
            }
            
        }

        [HttpPost("Login")]
        public IActionResult Login(UserLogin obj)
        {
            var user = _context.UserProfiles.SingleOrDefault(m => m.Email == obj.Email && m.Password == obj.Password);
            if (user == null)
            {
                return StatusCode(401, "Invalid Credentials");
            } else
            {
                return StatusCode(200, user);
            }
        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var list = _context.UserProfiles.ToList();
            return Ok(list);
        }
    }
}
