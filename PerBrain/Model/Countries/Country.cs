using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PerBrain.Model.Countries
{
    [Table("Countries")]
    public class Country
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CountryId { get; set; }
        public string Name { get; set; }
        public string PhoneCode { get; set; }
        public string CapitalCity { get; set; }
        public bool isActive { get; set; } = true;
        public DateTime? CreatedDate { get; set; }
    }
}
