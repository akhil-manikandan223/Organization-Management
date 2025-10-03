using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PerBrain.Model.UserProfiles
{
    [Table("UserProfiles")]
    public class UserProfile
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId {  get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public bool isActive { get; set; } = true;
        public DateTime? CreatedDate { get; set; }

    }

    public class UserLogin
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
