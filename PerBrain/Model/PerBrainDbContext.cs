using Microsoft.EntityFrameworkCore;
using PerBrain.Model.UserProfiles;

namespace PerBrain.Model
{
    public class PerBrainDbContext: DbContext
    {
        public PerBrainDbContext(DbContextOptions<PerBrainDbContext> options) : base(options) { }
        public DbSet<UserProfile> UserProfiles { get; set; }
    }
}
