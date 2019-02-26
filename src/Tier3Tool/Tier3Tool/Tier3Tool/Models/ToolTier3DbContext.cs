using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Tier3Tool.Models
{
    public partial class ToolTier3DbContext : DbContext
    {
        public ToolTier3DbContext()
        {
        }

        public ToolTier3DbContext(DbContextOptions<ToolTier3DbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Connections> Connections { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connection = @"Data Source=.;Initial Catalog=ToolTier3Db;User Id=sa;Password=Nolove10;";

            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(connection);
                //optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=ToolTier3Db;Integrated Security=True");
            }

            //optionsBuilder.UseSqlite("Data Source=ToolTier3Db.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Connections>(entity =>
            {
                entity.HasIndex(e => e.ConnectionName)
                    .HasName("UQ__Connecti__38090CF9505F0640")
                    .IsUnique();

                entity.Property(e => e.ConnectionName).HasMaxLength(50);

                entity.Property(e => e.ConnectionType).HasMaxLength(50);

                entity.Property(e => e.DatabaseName).HasMaxLength(50);

                entity.Property(e => e.DatabasePassword).HasMaxLength(50);

                entity.Property(e => e.DatabaseUsername).HasMaxLength(50);

                entity.Property(e => e.ServerName).HasMaxLength(50);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasIndex(e => e.Username)
                    .HasName("UQ__Users__536C85E4F3745627")
                    .IsUnique();

                entity.Property(e => e.CanAccessDw).HasColumnName("CanAccessDW");

                entity.Property(e => e.CanAccessHhax).HasColumnName("CanAccessHHAX");

                entity.Property(e => e.Password).HasMaxLength(50);

                entity.Property(e => e.Username).HasMaxLength(50);
            });
        }
    }
}
