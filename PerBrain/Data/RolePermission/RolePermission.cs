namespace PerBrain.Data.RolePermission
{
    public class RoleDto
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public List<int> PermissionIds { get; set; } = new List<int>();
    }

    public class PermissionDto
    {
        public int PermissionId { get; set; }
        public string PermissionName { get; set; }
        public string PermissionCode { get; set; }
        public string Module { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
    }

    public class UserRoleDto
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public DateTime AssignedDate { get; set; }
        public bool IsActive { get; set; }
    }

    // CreateRoleDto.cs
    public class CreateRoleDto
    {
        public string RoleName { get; set; }
        public string? Description { get; set; }
        public List<int>? PermissionIds { get; set; } = new List<int>();
        public int? CreatedBy { get; set; }
    }

    // UpdateRoleDto.cs
    public class UpdateRoleDto
    {
        public string RoleName { get; set; }
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;
        public List<int>? PermissionIds { get; set; } = new List<int>();
        public int? UpdatedBy { get; set; }
    }

    // AssignPermissionDto.cs
    public class AssignPermissionDto
    {
        public int RoleId { get; set; }
        public int PermissionId { get; set; }
        public int? AssignedBy { get; set; }
    }

}
