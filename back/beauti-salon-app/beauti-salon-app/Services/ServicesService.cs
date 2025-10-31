using beauti_salon_app.Data;
using beauti_salon_app.Models;
using beauti_salon_app.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace beauti_salon_app.Services.Implementations
{
    public class ServicesService : IServicesService
    {
        private readonly BeautySalonContext _context;

        public ServicesService(BeautySalonContext context)
        {
            _context = context;
        }

        public async Task<List<Service>> GetAllAsync()
        {
            return await _context.Services
                .Include(s => s.SubServices)
                    .ThenInclude(ss => ss.SubServiceMasters)
                        .ThenInclude(sm => sm.Master)
                .ToListAsync();
        }

        public async Task<Service?> GetByIdAsync(int id)
        {
            return await _context.Services
                .Include(s => s.SubServices)
                    .ThenInclude(ss => ss.SubServiceMasters)
                        .ThenInclude(sm => sm.Master)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Service> CreateAsync(Service service)
        {
            _context.Services.Add(service);
            await _context.SaveChangesAsync();
            return service;
        }

        public async Task<bool> UpdateAsync(int id, Service updatedService)
        {
            var existing = await _context.Services.FindAsync(id);
            if (existing == null) return false;

            existing.Title = updatedService.Title;
            existing.Description = updatedService.Description;
            existing.ImageSrc = updatedService.ImageSrc;
            existing.Category = updatedService.Category;
            existing.Price = updatedService.Price;

            _context.Services.Update(existing);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null) return false;

            _context.Services.Remove(service);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }
            return true;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Services.AnyAsync(s => s.Id == id);
        }

   
        public async Task<int> GetCountAsync()
        {
            return await _context.Services.CountAsync();
        }
    }
}
