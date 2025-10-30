using beauti_salon_app.Data;
using beauti_salon_app.Models;
using beauti_salon_app.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace beauti_salon_app.Services
{
    public class MastersService : IMasterService
    {
        private readonly BeautySalonContext _context;

        public MastersService(BeautySalonContext context)
        {
            _context = context;
        }

        public async Task<List<Master>> GetAllAsync()
        {
            return await _context.Masters
                .Include(m => m.PortfolioItems)
                .ToListAsync();
        }

        public async Task<Master?> GetByIdAsync(int id)
        {
            return await _context.Masters
                .Include(m => m.PortfolioItems)
                .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<Master> CreateAsync(Master master)
        {
            _context.Masters.Add(master);
            await _context.SaveChangesAsync();
            return master;
        }

        public async Task<bool> UpdateAsync(int id, Master updatedMaster)
        {
            var existing = await _context.Masters.FindAsync(id);
            if (existing == null)
                return false;

            existing.Name = updatedMaster.Name;
            existing.Experience = updatedMaster.Experience;
            existing.Description = updatedMaster.Description;
            existing.ImageSrc = updatedMaster.ImageSrc;
            existing.Specialization = updatedMaster.Specialization;
            existing.TopMaster = updatedMaster.TopMaster;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var master = await _context.Masters.FindAsync(id);
            if (master == null)
                return false;

            _context.Masters.Remove(master);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Masters.AnyAsync(m => m.Id == id);
        }

        public async Task<List<Master>> GetTopMastersAsync()
        {
            return await _context.Masters
                .Where(m => m.TopMaster==true)
                .Include(m => m.PortfolioItems)
                .ToListAsync();
        }

        public async Task<List<Master>> GetBySubServiceIdAsync(int subServiceId)
        {
            return await _context.Masters
                .Where(m => m.SubServiceMasters.Any(sm => sm.SubServiceId == subServiceId))
                .Include(m => m.PortfolioItems)
                .ToListAsync();
        }

        public async Task<int> GetCountAsync()
        {
            return await _context.Masters.CountAsync();
        }
    }
}
