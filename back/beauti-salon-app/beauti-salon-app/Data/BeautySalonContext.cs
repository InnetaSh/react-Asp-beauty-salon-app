using beauti_salon_app.Models;
using beauti_salon_app.Models.Enums;
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
        public DbSet<PortfolioItem> PortfolioItems { get; set; }
        public DbSet<OrderService> OrderServices { get; set; }

        public DbSet<Product> Products { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }

        //  Клиенты и пользователи
        public DbSet<Client> Clients { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Admin> Admins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ====== Связь "Мастер ↔️ Подуслуга" (многие ко многим)
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

            // ====== Портфолио мастера
            modelBuilder.Entity<PortfolioItem>()
                .HasOne(p => p.Master)
                .WithMany(m => m.PortfolioItems)
                .HasForeignKey(p => p.MasterId)
                .OnDelete(DeleteBehavior.Cascade);

            // ====== Связь заказов услуг и клиентов (опциональная)
            modelBuilder.Entity<OrderService>()
                .HasOne(o => o.Client)
                .WithMany(c => c.OrderServices)
                .HasForeignKey(o => o.ClientId)
                .OnDelete(DeleteBehavior.SetNull);

            // ====== Связь заказов товаров и клиентов (опциональная)
            modelBuilder.Entity<OrderProduct>()
                .HasOne(o => o.Client)
                .WithMany()
                .HasForeignKey(o => o.ClientId)
                .OnDelete(DeleteBehavior.SetNull);

            // ====== Связь заказов товаров и продуктов
            modelBuilder.Entity<OrderProduct>()
                .HasOne(o => o.Product)
                .WithMany()
                .HasForeignKey(o => o.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            // ====== Enum-конверсии в строки для Product
            modelBuilder.Entity<Product>()
                .Property(p => p.ProductClass)
                .HasConversion<string>();

            modelBuilder.Entity<Product>()
                .Property(p => p.Category)
                .HasConversion<string>();
        }
    }
}
