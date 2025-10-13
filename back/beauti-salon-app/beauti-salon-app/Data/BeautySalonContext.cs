using beauti_salon_app.Models;
using Microsoft.EntityFrameworkCore;


namespace beauti_salon_app.Data
{
    public class BeautySalonContext : DbContext
    {
        public BeautySalonContext(DbContextOptions<BeautySalonContext> options)
            : base(options)
        {
        }

        public DbSet<Service> Services { get; set; }
        public DbSet<SubService> SubServices { get; set; }
        public DbSet<Master> Masters { get; set; }
        public DbSet<SubServiceMaster> SubServiceMasters { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
            modelBuilder.Entity<SubServiceMaster>()
                .HasKey(sm => new { sm.SubServiceId, sm.MasterId });

            modelBuilder.Entity<SubServiceMaster>()
                .HasOne(sm => sm.SubService)
                .WithMany(s => s.SubServiceMasters)
                .HasForeignKey(sm => sm.SubServiceId);

            modelBuilder.Entity<SubServiceMaster>()
                .HasOne(sm => sm.Master)
                .WithMany(m => m.SubServiceMasters)
                .HasForeignKey(sm => sm.MasterId);
        }
    }
}
