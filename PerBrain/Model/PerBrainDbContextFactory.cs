using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace PerBrain.Model
{
    public class PerBrainDbContextFactory : IDesignTimeDbContextFactory<PerBrainDbContext>
    {
        public PerBrainDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<PerBrainDbContext>();

            // 👇
            optionsBuilder.UseSqlServer("Server=SMM-LP212\\SQLDEV22;Database=PerMind;Trusted_Connection=True;TrustServerCertificate=True;");

            return new PerBrainDbContext(optionsBuilder.Options);
        }
    }
}
