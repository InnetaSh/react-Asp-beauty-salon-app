using beauti_salon_app.Data;
using beauti_salon_app.Models;
using beauti_salon_app.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace beauti_salon_app.Services
{
    public class PortfolioService : IPortfolioService
    {
        private readonly BeautySalonContext _context;

        public PortfolioService(BeautySalonContext context)
        {
            _context = context;
        }

        public async Task<List<PortfolioItem>> GetAllAsync()
        {
            return await _context.PortfolioItems
                .Include(p => p.Master)
                .ToListAsync();
        }
        public async Task<List<PortfolioItem>> GetByMasterIdAsync(int id)
        {
            return await _context.PortfolioItems
                .Where(p => p.MasterId == id)
                .ToListAsync();
        }
        public async Task<PortfolioItem?> GetByIdAsync(int id)
        {
            return await _context.PortfolioItems
                .Include(p => p.Master)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<PortfolioItem> CreateAsync(PortfolioItem portfolioItem)
        {
            _context.PortfolioItems.Add(portfolioItem);
            await _context.SaveChangesAsync();
            return portfolioItem;
        }

        public async Task<bool> UpdateAsync(int id, PortfolioItem updatedPortfolioItem)
        {
            var existingItem = await _context.PortfolioItems.FindAsync(id);
            if (existingItem == null)
                return false;
            existingItem.ImageSrc = updatedPortfolioItem.ImageSrc;
            existingItem.TopPhoto = updatedPortfolioItem.TopPhoto;
            existingItem.MasterId = updatedPortfolioItem.MasterId;

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

        public async Task<bool> DeleteAsync(int id)
        {
            var portfolioItem = await _context.PortfolioItems.FindAsync(id);
            if (portfolioItem == null)
                return false;
            _context.PortfolioItems.Remove(portfolioItem);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.PortfolioItems.AnyAsync(p => p.Id == id);
        }
        public async Task<int> GetCountAsync()
        {
            return await _context.PortfolioItems.CountAsync();
        }
    }
}
