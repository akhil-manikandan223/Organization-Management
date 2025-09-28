using Microsoft.EntityFrameworkCore;
using PerBrain.Model.Countries;
using PerBrain.Model.StatesProvinces;
using PerBrain.Model.UserProfiles;

namespace PerBrain.Model
{
    public class PerBrainDbContext: DbContext
    {
        public PerBrainDbContext(DbContextOptions<PerBrainDbContext> options) : base(options) { }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<StateProvince> StatesProvinces { get; set; }
    }
}
