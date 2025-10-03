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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserProfile>(entity =>
            {
                entity.Property(u => u.isActive)
                      .HasDefaultValue(true);

                entity.Property(u => u.CreatedDate)
                      .HasDefaultValueSql("GETDATE()");

                entity.Property(u => u.FirstName)
                      .HasMaxLength(100)
                      .IsRequired();

                entity.Property(u => u.LastName)
                      .HasMaxLength(100)
                      .IsRequired();

                entity.Property(u => u.Email)
                      .HasMaxLength(255)
                      .IsRequired();

                entity.Property(u => u.Phone)
                      .HasMaxLength(20);

                entity.Property(u => u.AddressLine1)
                      .HasMaxLength(255);

                entity.Property(u => u.AddressLine2)
                      .HasMaxLength(255);

                entity.Property(u => u.City)
                      .HasMaxLength(100);

                entity.Property(u => u.PostalCode)
                      .HasMaxLength(20);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
