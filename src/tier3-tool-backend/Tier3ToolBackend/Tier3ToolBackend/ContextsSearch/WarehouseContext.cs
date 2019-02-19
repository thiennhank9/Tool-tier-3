using Microsoft.EntityFrameworkCore;

namespace Tier3ToolBackend.ContextsSearch
{
    public class DataImport_Client
    {
        public string jurisdictionID { get; set; }
        public string entPerson { get; set; }
    }

    public class Admissions_Types
    {
        public int AgencyID { get; set; }
        public string TypeID { get; set; }
        public string TypeName { get; set; }
        public bool TypeActive { get; set; }
    }

    public partial class WarehouseContext : DbContext
    {
        public WarehouseContext()
        {

        }

        public WarehouseContext(string connectionString) : base(GetOptions(connectionString))
        {

        }

        private static DbContextOptions GetOptions(string connectionString)
        {
            return SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), connectionString).Options;
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=ToolTier3Db;Integrated Security=True");
        //    }
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Admissions_Types>(entity =>
            {
                entity.Property(e => e.AgencyID).HasColumnType("int");

                entity.Property(e => e.TypeID).HasMaxLength(3);

                entity.Property(e => e.TypeName).HasMaxLength(50);

                entity.Property(e => e.TypeActive).HasColumnName("TypeActive");

            });

        }

        public virtual DbSet<DataImport_Client> DataImport_Clients { get; set; }
        public virtual DbSet<Admissions_Types> Admissions_Types { get; set; }
    }
}
