namespace PerBrain.Data.UserProfile
{
    public class UserRegistrationDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
    }

    public class UserEditDto
    {
        public int UserId { get; set; }

        // Basic Information
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string AlternatePhone { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }

        // Address Information
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }

        // Employment Information
        public string Department { get; set; }
        public string JobTitle { get; set; }
        public string EmployeeId { get; set; }
        public DateTime? HireDate { get; set; }
        public decimal? Salary { get; set; }
        public string Manager { get; set; }

        // Emergency Contact
        public string EmergencyContact { get; set; }
        public string EmergencyContactPhone { get; set; }

        // Additional
        public string ProfilePicture { get; set; }
        public string Notes { get; set; }
        public bool IsActive { get; set; }

        // Roles
        public List<int> RoleIds { get; set; } = new List<int>();
    }


}
