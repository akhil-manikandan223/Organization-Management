using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PerBrain.Model;

namespace PerBrain.Controllers.Permissions
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly PerBrainDbContext _context;

        public PermissionController(PerBrainDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetAllPermissions")]
        public async Task<IActionResult> GetAllPermissionsAsync([FromQuery] bool includeInactive = false)
        {
            try
            {
                var permissionsQuery = _context.Permissions.AsQueryable();

                // Filter by active status unless specifically requesting inactive ones
                if (!includeInactive)
                {
                    permissionsQuery = permissionsQuery.Where(p => p.IsActive);
                }

                var permissions = await permissionsQuery
                    .Include(p => p.RolePermissions)
                    .ThenInclude(rp => rp.Role)
                    .OrderBy(p => p.Module)
                    .ThenBy(p => p.PermissionName)
                    .ToListAsync();

                var result = permissions.Select(p => new
                {
                    p.PermissionId,
                    p.PermissionName,
                    p.PermissionCode,
                    p.Description,
                    p.Module,
                    p.IsActive,
                    p.CreatedDate,

                    // Count of roles that have this permission
                    RoleCount = p.RolePermissions.Count(rp => rp.Role.IsActive),

                    // Roles that have this permission
                    AssignedRoles = p.RolePermissions
                        .Where(rp => rp.Role.IsActive)
                        .Select(rp => new
                        {
                            rp.Role.RoleId,
                            rp.Role.RoleName,
                            rp.Role.Description,
                            rp.AssignedDate
                        }).ToList()
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving permissions", error = ex.Message });
            }
        }

        [HttpGet("GetPermission/{id}")]
        public async Task<IActionResult> GetPermissionAsync(int id)
        {
            try
            {
                var permission = await _context.Permissions
                    .Include(p => p.RolePermissions)
                    .ThenInclude(rp => rp.Role)
                    .FirstOrDefaultAsync(p => p.PermissionId == id);

                if (permission == null)
                {
                    return NotFound(new { message = "Permission not found" });
                }

                var result = new
                {
                    permission.PermissionId,
                    permission.PermissionName,
                    permission.PermissionCode,
                    permission.Description,
                    permission.Module,
                    permission.IsActive,
                    permission.CreatedDate,

                    // Roles that have this permission
                    AssignedRoles = permission.RolePermissions
                        .Where(rp => rp.Role.IsActive)
                        .Select(rp => new
                        {
                            rp.Role.RoleId,
                            rp.Role.RoleName,
                            rp.Role.Description,
                            rp.AssignedDate
                        }).ToList()
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving permission", error = ex.Message });
            }
        }

        [HttpGet("GetPermissionsByModule")]
        public async Task<IActionResult> GetPermissionsByModuleAsync([FromQuery] string? module = null)
        {
            try
            {
                var permissionsQuery = _context.Permissions
                    .Where(p => p.IsActive);

                if (!string.IsNullOrEmpty(module))
                {
                    permissionsQuery = permissionsQuery.Where(p => p.Module == module);
                }

                var permissions = await permissionsQuery
                    .OrderBy(p => p.Module)
                    .ThenBy(p => p.PermissionName)
                    .Select(p => new
                    {
                        p.PermissionId,
                        p.PermissionName,
                        p.PermissionCode,
                        p.Description,
                        p.Module,
                        p.IsActive
                    })
                    .ToListAsync();

                // Group by module
                var result = permissions
                    .GroupBy(p => p.Module)
                    .Select(g => new
                    {
                        Module = g.Key,
                        Permissions = g.ToList()
                    })
                    .OrderBy(x => x.Module)
                    .ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving permissions by module", error = ex.Message });
            }
        }

        [HttpGet("GetAllModules")]
        public async Task<IActionResult> GetAllModulesAsync()
        {
            try
            {
                var modules = await _context.Permissions
                    .Where(p => p.IsActive)
                    .Select(p => p.Module)
                    .Distinct()
                    .OrderBy(m => m)
                    .ToListAsync();

                return Ok(modules);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving modules", error = ex.Message });
            }
        }

        [HttpGet("GetPermissionsForRole/{roleId}")]
        public async Task<IActionResult> GetPermissionsForRoleAsync(int roleId)
        {
            try
            {
                var rolePermissions = await _context.RolePermissions
                    .Include(rp => rp.Permission)
                    .Where(rp => rp.RoleId == roleId)
                    .Select(rp => new
                    {
                        rp.Permission.PermissionId,
                        rp.Permission.PermissionName,
                        rp.Permission.PermissionCode,
                        rp.Permission.Description,
                        rp.Permission.Module,
                        rp.AssignedDate
                    })
                    .ToListAsync();

                return Ok(rolePermissions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving permissions for role", error = ex.Message });
            }
        }
    }
}
