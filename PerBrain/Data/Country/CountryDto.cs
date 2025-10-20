namespace PerBrain.Data.Country
{
    public class CountryDto
    {
        public int CountryId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PhoneCode { get; set; } = string.Empty;
        public string CapitalCity { get; set; } = string.Empty;
        public DateTime? CreatedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
