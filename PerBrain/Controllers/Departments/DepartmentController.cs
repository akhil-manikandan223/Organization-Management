using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using PerBrain.DTOs;
using PerBrain.Model;
using PerBrain.Model.Departments;

namespace PerBrain.Controllers.Departments
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly PerBrainDbContext _context;

        public DepartmentController(PerBrainDbContext context)
        {
            _context = context;
        }

        [HttpPost("CreateNewDepartment")]
        public IActionResult CreateDepartment(Department obj)
        {
            var departmentExistWithName = _context.Departments.SingleOrDefault(m => m.Name == obj.Name);
            if (departmentExistWithName == null)
            {
                obj.DepartmentId = 0;
                _context.Departments.Add(obj);
                _context.SaveChanges();
                return Created("Department registered successfully", obj);
            }
            else
            {
                return StatusCode(500, "Department name is already registered.");
            }

        }

        [HttpGet("GetAllDepartments")]
        public IActionResult GetAllDepartments()
        {
            var list = _context.Departments.ToList();
            return Ok(list);
        }

        [HttpGet("GetDepartmentById/{id}")]
        public IActionResult GetDepartmentById(int id)
        {
            try
            {
                var department = _context.Departments.SingleOrDefault(m => m.DepartmentId == id);

                if (department == null)
                {
                    return NotFound($"Department with ID {id} not found");
                }

                return Ok(department);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving department: {ex.Message}");
            }
        }

        [HttpDelete("DeleteDepartment/{id}")]
        public IActionResult DeleteDepartment(int id)
        {
            try
            {
                var department = _context.Departments.SingleOrDefault(m => m.DepartmentId == id);
                if (department == null)
                {
                    return NotFound($"Department with ID {id} not found");
                }

                if (!department.IsActive)
                {
                    return BadRequest($"Department with ID {id} is already inactive");
                }

                // Soft delete: Set isActive to false instead of removing
                department.IsActive = false;
                _context.SaveChanges();

                return Ok(new
                {
                    message = "Department deactivated successfully",
                    deactivatedDepartmentId = id,
                    department.IsActive
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deactivating department: {ex.Message}");
            }
        }

        [HttpDelete("DeleteMultipleDepartments")]
        public IActionResult DeleteMultipleDepartments([FromBody] List<int> departmentsIds)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                if (departmentsIds == null || departmentsIds.Count == 0)
                {
                    return BadRequest("No department IDs provided for deactivation");
                }

                var departmentToDeactivate = _context.Departments
                    .Where(u => departmentsIds.Contains(u.DepartmentId) && u.IsActive)
                    .ToList();

                if (departmentToDeactivate.Count == 0)
                {
                    return NotFound("No active department found with the provided IDs");
                }

                foreach (var department in departmentToDeactivate)
                {
                    department.IsActive = false;
                }

                _context.SaveChanges();
                transaction.Commit();

                var response = new
                {
                    message = $"Successfully deactivated {departmentToDeactivate.Count} department(s)",
                    deactivatedCount = departmentToDeactivate.Count,
                    deactivatedDepartmentIds = departmentToDeactivate.Select(u => u.DepartmentId).ToList()
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return StatusCode(500, $"Error deactivating department: {ex.Message}");
            }
        }
    }
}
