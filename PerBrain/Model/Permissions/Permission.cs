using PerBrain.Model.RolePermissions;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PerBrain.Model.Permissions
{
    [Table("Permissions")]
    public class Permission
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PermissionId { get; set; }

        [Required, MaxLength(100)]
        public string PermissionName { get; set; }

        [Required, MaxLength(100)]
        public string PermissionCode { get; set; } // e.g., "USERS_VIEW", "USERS_CREATE"

        [MaxLength(200)]
        public string? Module { get; set; } // e.g., "Users", "Dashboard", "Reports"

        [MaxLength(500)]
        public string? Description { get; set; }

        public bool IsActive { get; set; } = true;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [JsonIgnore]
        public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
    }
}
