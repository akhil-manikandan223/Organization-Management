using PerBrain.Model.Permissions;
using PerBrain.Model.Roles;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security;

namespace PerBrain.Model.RolePermissions
{
    [Table("RolePermissions")]
    public class RolePermission
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RolePermissionId { get; set; }

        [ForeignKey("Role")]
        public int RoleId { get; set; }

        [ForeignKey("Permission")]
        public int PermissionId { get; set; }

        public DateTime AssignedDate { get; set; } = DateTime.UtcNow;
        public int? AssignedBy { get; set; }

        // Navigation properties
        public virtual Role Role { get; set; }
        public virtual Permission Permission { get; set; }
    }
}
