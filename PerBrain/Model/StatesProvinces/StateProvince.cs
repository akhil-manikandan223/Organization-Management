using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PerBrain.Model.StatesProvinces
{
    [Table("StatesProvinces")]
    public class StateProvince
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StateProvinceId { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }
        public string CapitalCity { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
