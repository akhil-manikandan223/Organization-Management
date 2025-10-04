using PerBrain.Model.UserRoles;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PerBrain.Model.UserProfiles
{
    [Table("UserProfiles")]
    public class UserProfile
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        // Basic Information (existing fields)
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        // Address Information (existing fields)
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }

        // Additional fields for editing (not in registration)
        public string? MiddleName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; } // Male, Female, Other
        public string? Department { get; set; }
        public string? JobTitle { get; set; }
        public string? EmployeeId { get; set; }
        public DateTime? JoiningDate { get; set; }
        public string? Manager { get; set; }
        public string? ProfilePicture { get; set; }
        public string? Country { get; set; }
        public string? State { get; set; }
        public string? AlternatePhone { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyContactPhone { get; set; }
        public string? Notes { get; set; }

        // System fields (existing)
        public bool IsActive { get; set; } = true;
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }

        // Navigation property for roles
        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }


    public class UserLogin
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
