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

        [HttpDelete("DeleteUser/{id}")]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                var user = _context.UserProfiles.SingleOrDefault(m => m.UserId == id);
                if (user == null)
                {
                    return NotFound($"User with ID {id} not found");
                }

                _context.UserProfiles.Remove(user);
                _context.SaveChanges();

                return Ok(new { message = "User deleted successfully", deletedUserId = id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting user: {ex.Message}");
            }
        }

        [HttpDelete("DeleteMultipleUsers")]
        public IActionResult DeleteMultipleUsers([FromBody] List<int> userIds)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                if (userIds == null || userIds.Count == 0)
                {
                    return BadRequest("No user IDs provided for deletion");
                }

                // Find all users with the provided IDs
                var usersToDelete = _context.UserProfiles
                    .Where(u => userIds.Contains(u.UserId))
                    .ToList();

                if (usersToDelete.Count == 0)
                {
                    return NotFound("No users found with the provided IDs");
                }

                // Remove all found users
                _context.UserProfiles.RemoveRange(usersToDelete);
                _context.SaveChanges();

                // Commit the transaction
                transaction.Commit();

                var response = new
                {
                    message = $"Successfully deleted {usersToDelete.Count} user(s)",
                    deletedCount = usersToDelete.Count,
                    deletedUserIds = usersToDelete.Select(u => u.UserId).ToList()
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return StatusCode(500, $"Error deleting users: {ex.Message}");
            }
        }


    }
}
