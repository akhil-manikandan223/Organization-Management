using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.UserProfiles
                .Include(u => u.UserRoles.Where(ur => ur.IsActive))
                .ThenInclude(ur => ur.Role)
                .ToListAsync();

            return Ok(users);
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

                // Check if user is already inactive
                if (!user.IsActive)
                {
                    return BadRequest($"User with ID {id} is already inactive");
                }

                // Soft delete: Set isActive to false instead of removing
                user.IsActive = false;
                _context.SaveChanges();

                return Ok(new
                {
                    message = "User deactivated successfully",
                    deactivatedUserId = id,
                    user.IsActive
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deactivating user: {ex.Message}");
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
                    return BadRequest("No user IDs provided for deactivation");
                }

                // Find all active users with the provided IDs
                var usersToDeactivate = _context.UserProfiles
                    .Where(u => userIds.Contains(u.UserId) && u.IsActive)
                    .ToList();

                if (usersToDeactivate.Count == 0)
                {
                    return NotFound("No active users found with the provided IDs");
                }

                // Set isActive to false for all found users
                foreach (var user in usersToDeactivate)
                {
                    user.IsActive = false;
                }

                _context.SaveChanges();
                transaction.Commit();

                var response = new
                {
                    message = $"Successfully deactivated {usersToDeactivate.Count} user(s)",
                    deactivatedCount = usersToDeactivate.Count,
                    deactivatedUserIds = usersToDeactivate.Select(u => u.UserId).ToList()
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return StatusCode(500, $"Error deactivating users: {ex.Message}");
            }
        }


    }
}
