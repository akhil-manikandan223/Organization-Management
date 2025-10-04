using PerBrain.Model.Roles;
using PerBrain.Model.UserProfiles;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PerBrain.Model.UserRoles
{
    [Table("UserRoles")]
    public class UserRole
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserRoleId { get; set; }

        [ForeignKey("UserProfile")]
        public int UserId { get; set; }

        [ForeignKey("Role")]
        public int RoleId { get; set; }

        public DateTime AssignedDate { get; set; } = DateTime.UtcNow;
        public int? AssignedBy { get; set; }
        public bool IsActive { get; set; } = true;

        // Navigation properties
        [JsonIgnore]
        public virtual UserProfile UserProfile { get; set; }
        public virtual Role Role { get; set; }
    }
}
