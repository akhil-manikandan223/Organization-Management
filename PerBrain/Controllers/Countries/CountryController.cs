using Microsoft.AspNetCore.Mvc;
using PerBrain.Model;
using PerBrain.Model.Countries;
using PerBrain.Model.Departments;

namespace PerBrain.Controllers.Countries
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly PerBrainDbContext _context;

        public CountryController(PerBrainDbContext context)
        {
            _context = context;
        }

        [HttpPost("CreateNewCountry")]
        public IActionResult CreateCountry(Country obj)
        {
            var departmentExistWithName = _context.Countries.SingleOrDefault(m => m.Name == obj.Name);
            if (departmentExistWithName == null)
            {
                obj.CountryId = 0;
                _context.Countries.Add(obj);
                _context.SaveChanges();
                return Created("Country registered successfully", obj);
            }
            else
            {
                return StatusCode(500, "Country name is already registered.");
            }

        }

        [HttpGet("GetAllCountries")]
        public IActionResult GetAllCountries()
        {
            var list = _context.Countries.ToList();
            return Ok(list);
        }

        [HttpGet("GetCountryById/{id}")]
        public IActionResult GetCountryById(int id)
        {
            try
            {
                var country = _context.Countries.SingleOrDefault(m => m.CountryId == id);

                if (country == null)
                {
                    return NotFound($"Country with ID {id} not found");
                }

                return Ok(country);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving country: {ex.Message}");
            }
        }
    }
}
