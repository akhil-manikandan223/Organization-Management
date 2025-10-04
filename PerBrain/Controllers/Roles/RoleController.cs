using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PerBrain.Data.RolePermission;
using PerBrain.Model;
using PerBrain.Model.RolePermissions;
using PerBrain.Model.Roles;

namespace PerBrain.Controllers.Roles
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly PerBrainDbContext _context;

        public RoleController(PerBrainDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetAllRoles")]
        public async Task<IActionResult> GetAllRoles()
        {
            try
            {
                // Get all roles with their related data
                var rolesData = await _context.Roles
                    .Include(r => r.RolePermissions)
                    .ThenInclude(rp => rp.Permission)
                    .Include(r => r.UserRoles.Where(ur => ur.IsActive))
                    .ThenInclude(ur => ur.UserProfile)
                    .OrderBy(r => r.RoleName)
                    .ToListAsync();

                // Get user lookup dictionary for creators/updaters
                var userIds = rolesData
                    .SelectMany(r => new[] { r.CreatedBy, r.UpdatedBy })
                    .Where(id => id.HasValue)
                    .Select(id => id.Value)
                    .Distinct()
                    .ToList();

                var users = await _context.UserProfiles
                    .Where(u => userIds.Contains(u.UserId))
                    .Select(u => new
                    {
                        u.UserId,
                        u.FirstName,
                        u.LastName,
                        u.Email,
                        FullName = u.FirstName + " " + u.LastName
                    })
                    .ToListAsync();

                var userLookup = users.ToDictionary(u => u.UserId);

                // Map the results
                var result = rolesData.Select(r => new
                {
                    r.RoleId,
                    r.RoleName,
                    r.Description,
                    r.IsActive,
                    r.CreatedDate,
                    r.UpdatedDate,
                    r.CreatedBy,

                    // Creator information
                    CreatedByUser = r.CreatedBy.HasValue && userLookup.ContainsKey(r.CreatedBy.Value)
                        ? userLookup[r.CreatedBy.Value]
                        : null,

                    // Updater information
                    UpdatedByUser = r.UpdatedBy.HasValue && userLookup.ContainsKey(r.UpdatedBy.Value)
                        ? userLookup[r.UpdatedBy.Value]
                        : null,

                    // Count of users with this role
                    UserCount = r.UserRoles.Count(ur => ur.IsActive),

                    // Permissions assigned to this role
                    Permissions = r.RolePermissions.Select(rp => new
                    {
                        rp.Permission.PermissionId,
                        rp.Permission.PermissionName,
                        rp.Permission.PermissionCode,
                        rp.Permission.Module,
                        rp.AssignedDate
                    }).ToList(),

                    // Users with this role
                    Users = r.UserRoles
                        .Where(ur => ur.IsActive)
                        .Select(ur => new
                        {
                            ur.UserProfile.UserId,
                            ur.UserProfile.FirstName,
                            ur.UserProfile.LastName,
                            ur.UserProfile.Email,
                            ur.AssignedDate
                        }).ToList()
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving roles", error = ex.Message });
            }
        }

        [HttpGet("GetRole/{id}")]
        public async Task<IActionResult> GetRole(int id)
        {
            try
            {
                var role = await _context.Roles
                    .Include(r => r.RolePermissions)
                    .ThenInclude(rp => rp.Permission)
                    .Include(r => r.UserRoles.Where(ur => ur.IsActive))
                    .ThenInclude(ur => ur.UserProfile)
                    .Where(r => r.RoleId == id)
                    .Select(r => new
                    {
                        r.RoleId,
                        r.RoleName,
                        r.Description,
                        r.IsActive,
                        r.CreatedDate,
                        r.UpdatedDate,
                        r.CreatedBy,
                        r.UpdatedBy,

                        Permissions = r.RolePermissions.Select(rp => new
                        {
                            rp.Permission.PermissionId,
                            rp.Permission.PermissionName,
                            rp.Permission.PermissionCode,
                            rp.Permission.Module,
                            rp.Permission.Description,
                            rp.AssignedDate
                        }).ToList(),

                        Users = r.UserRoles
                            .Where(ur => ur.IsActive)
                            .Select(ur => new
                            {
                                ur.UserProfile.UserId,
                                ur.UserProfile.FirstName,
                                ur.UserProfile.LastName,
                                ur.UserProfile.Email,
                                ur.AssignedDate
                            }).ToList()
                    })
                    .FirstOrDefaultAsync();

                if (role == null)
                {
                    return NotFound(new { message = "Role not found" });
                }

                return Ok(role);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving role", error = ex.Message });
            }
        }

        [HttpPost("CreateRole")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleDto createRoleDto)
        {
            try
            {
                if (createRoleDto == null)
                {
                    return BadRequest(new { message = "Role data is required" });
                }

                // Check if role name already exists
                var existingRole = await _context.Roles
                    .FirstOrDefaultAsync(r => r.RoleName.ToLower() == createRoleDto.RoleName.ToLower());

                if (existingRole != null)
                {
                    return Conflict(new { message = "Role name already exists" });
                }

                var role = new Role
                {
                    RoleName = createRoleDto.RoleName.Trim(),
                    Description = createRoleDto.Description?.Trim(),
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow,
                    CreatedBy = createRoleDto.CreatedBy // You might get this from JWT token
                };

                _context.Roles.Add(role);
                await _context.SaveChangesAsync();

                // Assign permissions if provided
                if (createRoleDto.PermissionIds != null && createRoleDto.PermissionIds.Any())
                {
                    foreach (var permissionId in createRoleDto.PermissionIds)
                    {
                        var rolePermission = new RolePermission
                        {
                            RoleId = role.RoleId,
                            PermissionId = permissionId,
                            AssignedDate = DateTime.UtcNow,
                            AssignedBy = createRoleDto.CreatedBy
                        };
                        _context.RolePermissions.Add(rolePermission);
                    }
                    await _context.SaveChangesAsync();
                }

                return CreatedAtAction(nameof(GetRole), new { id = role.RoleId },
                    new { message = "Role created successfully", roleId = role.RoleId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error creating role", error = ex.Message });
            }
        }

        [HttpPut("UpdateRole/{id}")]
        public async Task<IActionResult> UpdateRole(int id, [FromBody] UpdateRoleDto updateRoleDto)
        {
            try
            {
                if (updateRoleDto == null)
                {
                    return BadRequest(new { message = "Role data is required" });
                }

                var role = await _context.Roles
                    .Include(r => r.RolePermissions)
                    .FirstOrDefaultAsync(r => r.RoleId == id);

                if (role == null)
                {
                    return NotFound(new { message = "Role not found" });
                }

                // Check if new role name conflicts with existing roles (excluding current role)
                var existingRole = await _context.Roles
                    .FirstOrDefaultAsync(r => r.RoleName.ToLower() == updateRoleDto.RoleName.ToLower()
                                            && r.RoleId != id);

                if (existingRole != null)
                {
                    return Conflict(new { message = "Role name already exists" });
                }

                // Update role properties
                role.RoleName = updateRoleDto.RoleName.Trim();
                role.Description = updateRoleDto.Description?.Trim();
                role.IsActive = updateRoleDto.IsActive;
                role.UpdatedDate = DateTime.UtcNow;
                role.UpdatedBy = updateRoleDto.UpdatedBy;

                // Update permissions
                if (updateRoleDto.PermissionIds != null)
                {
                    // Remove existing permissions
                    _context.RolePermissions.RemoveRange(role.RolePermissions);

                    // Add new permissions
                    foreach (var permissionId in updateRoleDto.PermissionIds)
                    {
                        var rolePermission = new RolePermission
                        {
                            RoleId = role.RoleId,
                            PermissionId = permissionId,
                            AssignedDate = DateTime.UtcNow,
                            AssignedBy = updateRoleDto.UpdatedBy
                        };
                        _context.RolePermissions.Add(rolePermission);
                    }
                }

                await _context.SaveChangesAsync();

                return Ok(new { message = "Role updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating role", error = ex.Message });
            }
        }

        [HttpDelete("DeleteRole/{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            try
            {
                var role = await _context.Roles
                    .Include(r => r.UserRoles)
                    .FirstOrDefaultAsync(r => r.RoleId == id);

                if (role == null)
                {
                    return NotFound(new { message = "Role not found" });
                }

                // Check if role is assigned to any active users
                var activeUserCount = role.UserRoles.Count(ur => ur.IsActive);
                if (activeUserCount > 0)
                {
                    return BadRequest(new
                    {
                        message = $"Cannot delete role. It is assigned to {activeUserCount} active user(s). Please remove role assignments first."
                    });
                }

                _context.Roles.Remove(role);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Role deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting role", error = ex.Message });
            }
        }

        [HttpGet("GetRolePermissions/{roleId}")]
        public async Task<IActionResult> GetRolePermissions(int roleId)
        {
            try
            {
                var permissions = await _context.RolePermissions
                    .Where(rp => rp.RoleId == roleId)
                    .Include(rp => rp.Permission)
                    .Select(rp => new
                    {
                        rp.Permission.PermissionId,
                        rp.Permission.PermissionName,
                        rp.Permission.PermissionCode,
                        rp.Permission.Module,
                        rp.Permission.Description,
                        rp.AssignedDate
                    })
                    .ToListAsync();

                return Ok(permissions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving role permissions", error = ex.Message });
            }
        }

        [HttpPost("AssignPermission")]
        public async Task<IActionResult> AssignPermission([FromBody] AssignPermissionDto assignDto)
        {
            try
            {
                // Check if assignment already exists
                var existingAssignment = await _context.RolePermissions
                    .FirstOrDefaultAsync(rp => rp.RoleId == assignDto.RoleId && rp.PermissionId == assignDto.PermissionId);

                if (existingAssignment != null)
                {
                    return Conflict(new { message = "Permission already assigned to this role" });
                }

                var rolePermission = new RolePermission
                {
                    RoleId = assignDto.RoleId,
                    PermissionId = assignDto.PermissionId,
                    AssignedDate = DateTime.UtcNow,
                    AssignedBy = assignDto.AssignedBy
                };

                _context.RolePermissions.Add(rolePermission);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Permission assigned successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error assigning permission", error = ex.Message });
            }
        }

        [HttpDelete("RemovePermission/{roleId}/{permissionId}")]
        public async Task<IActionResult> RemovePermission(int roleId, int permissionId)
        {
            try
            {
                var rolePermission = await _context.RolePermissions
                    .FirstOrDefaultAsync(rp => rp.RoleId == roleId && rp.PermissionId == permissionId);

                if (rolePermission == null)
                {
                    return NotFound(new { message = "Permission assignment not found" });
                }

                _context.RolePermissions.Remove(rolePermission);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Permission removed successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error removing permission", error = ex.Message });
            }
        }
    }
}
