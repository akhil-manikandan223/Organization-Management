using Microsoft.EntityFrameworkCore;
using PerBrain.Model.Countries;
using PerBrain.Model.Permissions;
using PerBrain.Model.RolePermissions;
using PerBrain.Model.Roles;
using PerBrain.Model.StatesProvinces;
using PerBrain.Model.UserProfiles;
using PerBrain.Model.UserRoles;

namespace PerBrain.Model
{
    public class PerBrainDbContext : DbContext
    {
        public PerBrainDbContext(DbContextOptions<PerBrainDbContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<StateProvince> StatesProvinces { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // UserProfile Configuration (Enhanced)
            modelBuilder.Entity<UserProfile>(entity =>
            {
                entity.Property(u => u.IsActive)
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

                // Add new field configurations for enhanced user profile
                entity.Property(u => u.MiddleName)
                      .HasMaxLength(100);

                entity.Property(u => u.Gender)
                      .HasMaxLength(20);

                entity.Property(u => u.Department)
                      .HasMaxLength(100);

                entity.Property(u => u.JobTitle)
                      .HasMaxLength(100);

                entity.Property(u => u.EmployeeId)
                      .HasMaxLength(50);

                entity.Property(u => u.Manager)
                      .HasMaxLength(200);

                entity.Property(u => u.ProfilePicture)
                      .HasMaxLength(500);

                entity.Property(u => u.Country)
                      .HasMaxLength(100);

                entity.Property(u => u.State)
                      .HasMaxLength(100);

                entity.Property(u => u.AlternatePhone)
                      .HasMaxLength(20);

                entity.Property(u => u.EmergencyContact)
                      .HasMaxLength(200);

                entity.Property(u => u.EmergencyContactPhone)
                      .HasMaxLength(20);

                entity.Property(u => u.Notes)
                      .HasMaxLength(1000);

                // Add unique constraint on Email
                entity.HasIndex(u => u.Email)
                      .IsUnique();

                // Add unique constraint on EmployeeId if not null
                entity.HasIndex(u => u.EmployeeId)
                      .IsUnique()
                      .HasFilter("[EmployeeId] IS NOT NULL");
            });

            // Role Configuration
            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(r => r.RoleName)
                      .HasMaxLength(100)
                      .IsRequired();

                entity.Property(r => r.Description)
                      .HasMaxLength(500);

                entity.Property(r => r.IsActive)
                      .HasDefaultValue(true);

                entity.Property(r => r.CreatedDate)
                      .HasDefaultValueSql("GETDATE()");

                // Add unique constraint on RoleName
                entity.HasIndex(r => r.RoleName)
                      .IsUnique();
            });

            // Permission Configuration
            modelBuilder.Entity<Permission>(entity =>
            {
                entity.Property(p => p.PermissionName)
                      .HasMaxLength(100)
                      .IsRequired();

                entity.Property(p => p.PermissionCode)
                      .HasMaxLength(100)
                      .IsRequired();

                entity.Property(p => p.Module)
                      .HasMaxLength(200);

                entity.Property(p => p.Description)
                      .HasMaxLength(500);

                entity.Property(p => p.IsActive)
                      .HasDefaultValue(true);

                entity.Property(p => p.CreatedDate)
                      .HasDefaultValueSql("GETDATE()");

                // Add unique constraints
                entity.HasIndex(p => p.PermissionCode)
                      .IsUnique();

                entity.HasIndex(p => p.PermissionName)
                      .IsUnique();
            });

            // UserRole Configuration
            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.Property(ur => ur.IsActive)
                      .HasDefaultValue(true);

                entity.Property(ur => ur.AssignedDate)
                      .HasDefaultValueSql("GETDATE()");

                // Configure foreign key relationships
                entity.HasOne(ur => ur.UserProfile)
                      .WithMany(u => u.UserRoles)
                      .HasForeignKey(ur => ur.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(ur => ur.Role)
                      .WithMany(r => r.UserRoles)
                      .HasForeignKey(ur => ur.RoleId)
                      .OnDelete(DeleteBehavior.Cascade);

                // Add unique constraint to prevent duplicate user-role assignments
                entity.HasIndex(ur => new { ur.UserId, ur.RoleId })
                      .IsUnique()
                      .HasFilter("[IsActive] = 1");
            });

            // RolePermission Configuration
            modelBuilder.Entity<RolePermission>(entity =>
            {
                entity.Property(rp => rp.AssignedDate)
                      .HasDefaultValueSql("GETDATE()");

                // Configure foreign key relationships
                entity.HasOne(rp => rp.Role)
                      .WithMany(r => r.RolePermissions)
                      .HasForeignKey(rp => rp.RoleId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(rp => rp.Permission)
                      .WithMany(p => p.RolePermissions)
                      .HasForeignKey(rp => rp.PermissionId)
                      .OnDelete(DeleteBehavior.Cascade);

                // Add unique constraint to prevent duplicate role-permission assignments
                entity.HasIndex(rp => new { rp.RoleId, rp.PermissionId })
                      .IsUnique();
            });

            // Seed initial data
            SeedRolesAndPermissions(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }

        private void SeedRolesAndPermissions(ModelBuilder modelBuilder)
        {
            // Seed Permissions
            modelBuilder.Entity<Permission>().HasData(
                new Permission
                {
                    PermissionId = 1,
                    PermissionName = "View Users",
                    PermissionCode = "USERS_VIEW",
                    Module = "Users",
                    Description = "Ability to view user list and details",
                    CreatedDate = DateTime.UtcNow
                },
                new Permission
                {
                    PermissionId = 2,
                    PermissionName = "Create Users",
                    PermissionCode = "USERS_CREATE",
                    Module = "Users",
                    Description = "Ability to create new users",
                    CreatedDate = DateTime.UtcNow
                },
                new Permission
                {
                    PermissionId = 3,
                    PermissionName = "Edit Users",
                    PermissionCode = "USERS_EDIT",
                    Module = "Users",
                    Description = "Ability to edit existing users",
                    CreatedDate = DateTime.UtcNow
                },
                new Permission
                {
                    PermissionId = 4,
                    PermissionName = "Delete Users",
                    PermissionCode = "USERS_DELETE",
                    Module = "Users",
                    Description = "Ability to delete users",
                    CreatedDate = DateTime.UtcNow
                },
                new Permission
                {
                    PermissionId = 5,
                    PermissionName = "View Dashboard",
                    PermissionCode = "DASHBOARD_VIEW",
                    Module = "Dashboard",
                    Description = "Ability to access the main dashboard",
                    CreatedDate = DateTime.UtcNow
                },
                new Permission
                {
                    PermissionId = 6,
                    PermissionName = "View Reports",
                    PermissionCode = "REPORTS_VIEW",
                    Module = "Reports",
                    Description = "Ability to view reports",
                    CreatedDate = DateTime.UtcNow
                },
                new Permission
                {
                    PermissionId = 7,
                    PermissionName = "Manage Roles",
                    PermissionCode = "ROLES_MANAGE",
                    Module = "Administration",
                    Description = "Ability to create and manage roles and permissions",
                    CreatedDate = DateTime.UtcNow
                },
                new Permission
                {
                    PermissionId = 8,
                    PermissionName = "View Teams",
                    PermissionCode = "TEAMS_VIEW",
                    Module = "Teams",
                    Description = "Ability to view teams",
                    CreatedDate = DateTime.UtcNow
                },
                new Permission
                {
                    PermissionId = 9,
                    PermissionName = "View Workspaces",
                    PermissionCode = "WORKSPACES_VIEW",
                    Module = "Workspaces",
                    Description = "Ability to view workspaces",
                    CreatedDate = DateTime.UtcNow
                }
            );

            // Seed Roles
            modelBuilder.Entity<Role>().HasData(
                new Role
                {
                    RoleId = 1,
                    RoleName = "Super Admin",
                    Description = "Full system access with all permissions",
                    CreatedDate = DateTime.UtcNow
                },
                new Role
                {
                    RoleId = 2,
                    RoleName = "Admin",
                    Description = "Administrative access without role management",
                    CreatedDate = DateTime.UtcNow
                },
                new Role
                {
                    RoleId = 3,
                    RoleName = "Manager",
                    Description = "Management level access to users and reports",
                    CreatedDate = DateTime.UtcNow
                },
                new Role
                {
                    RoleId = 4,
                    RoleName = "Team Lead",
                    Description = "Team leadership access",
                    CreatedDate = DateTime.UtcNow
                },
                new Role
                {
                    RoleId = 5,
                    RoleName = "User",
                    Description = "Basic user access to dashboard and assigned areas",
                    CreatedDate = DateTime.UtcNow
                }
            );

            // Seed Role-Permission mappings
            modelBuilder.Entity<RolePermission>().HasData(
                // Super Admin - All permissions
                new RolePermission { RolePermissionId = 1, RoleId = 1, PermissionId = 1, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 2, RoleId = 1, PermissionId = 2, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 3, RoleId = 1, PermissionId = 3, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 4, RoleId = 1, PermissionId = 4, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 5, RoleId = 1, PermissionId = 5, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 6, RoleId = 1, PermissionId = 6, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 7, RoleId = 1, PermissionId = 7, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 8, RoleId = 1, PermissionId = 8, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 9, RoleId = 1, PermissionId = 9, AssignedDate = DateTime.UtcNow },

                // Admin - Most permissions except role management
                new RolePermission { RolePermissionId = 10, RoleId = 2, PermissionId = 1, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 11, RoleId = 2, PermissionId = 2, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 12, RoleId = 2, PermissionId = 3, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 13, RoleId = 2, PermissionId = 4, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 14, RoleId = 2, PermissionId = 5, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 15, RoleId = 2, PermissionId = 6, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 16, RoleId = 2, PermissionId = 8, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 17, RoleId = 2, PermissionId = 9, AssignedDate = DateTime.UtcNow },

                // Manager - View and edit users, dashboard, reports, teams
                new RolePermission { RolePermissionId = 18, RoleId = 3, PermissionId = 1, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 19, RoleId = 3, PermissionId = 3, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 20, RoleId = 3, PermissionId = 5, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 21, RoleId = 3, PermissionId = 6, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 22, RoleId = 3, PermissionId = 8, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 23, RoleId = 3, PermissionId = 9, AssignedDate = DateTime.UtcNow },

                // Team Lead - Basic management access
                new RolePermission { RolePermissionId = 24, RoleId = 4, PermissionId = 1, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 25, RoleId = 4, PermissionId = 5, AssignedDate = DateTime.UtcNow },
                new RolePermission { RolePermissionId = 26, RoleId = 4, PermissionId = 8, AssignedDate = DateTime.UtcNow },

                // User - Basic access
                new RolePermission { RolePermissionId = 27, RoleId = 5, PermissionId = 5, AssignedDate = DateTime.UtcNow }
            );
        }
    }
}
