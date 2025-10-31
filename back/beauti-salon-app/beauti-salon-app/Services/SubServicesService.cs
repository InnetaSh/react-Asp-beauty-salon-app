using beauti_salon_app.Data;
using beauti_salon_app.Models;
using beauti_salon_app.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace beauti_salon_app.Services
{
    public class SubServicesService : ISubServicesService
    {
        private readonly BeautySalonContext _context;

        public SubServicesService(BeautySalonContext context)
        {
            _context = context;
        }

        public async Task<List<SubService>> GetAllAsync()
        {
            return await _context.SubServices
                .Include(ss => ss.Service)
                .Include(ss => ss.SubServiceMasters)
                    .ThenInclude(ssm => ssm.Master)
                .ToListAsync();
        }

        public async Task<SubService?> GetByIdAsync(int id)
        {
            return await _context.SubServices
                .Include(ss => ss.Service)
                .Include(ss => ss.SubServiceMasters)
                    .ThenInclude(ssm => ssm.Master)
                .FirstOrDefaultAsync(ss => ss.Id == id);
        }

        public async Task<List<SubService>> GetByServiceIdAsync(int serviceId)
        {
            return await _context.SubServices
                .Where(ss => ss.ServiceId == serviceId)
                .Include(ss => ss.SubServiceMasters)
                    .ThenInclude(ssm => ssm.Master)
                .ToListAsync();
        }

        public async Task<SubService> CreateAsync(SubService subService)
        {
            _context.SubServices.Add(subService);
            await _context.SaveChangesAsync();
            return subService;
        }

        public async Task<bool> UpdateAsync(int id, SubService updatedSubService)
        {
            var existing = await _context.SubServices.FindAsync(id);
            if (existing == null)
                return false;

            existing.Title = updatedSubService.Title;
            existing.Description = updatedSubService.Description;
            existing.ImageSrc = updatedSubService.ImageSrc;
            existing.Price = updatedSubService.Price;
            existing.ServiceId = updatedSubService.ServiceId;

            _context.SubServices.Update(existing);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var subService = await _context.SubServices.FindAsync(id);
            if (subService == null)
                return false;

            _context.SubServices.Remove(subService);
            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<List<SubService>> GetTopServicesAsync()
        {
            return await _context.SubServices
                .Include(ss => ss.SubServiceMasters)
                    .ThenInclude(ssm => ssm.Master)
                .OrderByDescending(ss => ss.Price)
                .Take(5)
                .ToListAsync();
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.SubServices.AnyAsync(ss => ss.Id == id);
        }

        public async Task<int> GetCountAsync()
        {
            return await _context.SubServices.CountAsync();
        }


        // Поиск ID подуслуги по названию
        public async Task<int?> GetIdByTitleAsync(string title)
        {
            title = title.Trim().ToLower();

            var subServiceId = await _context.SubServices
                .Where(ss => ss.Title.ToLower().Trim() == title)
                .Select(ss => ss.Id)
                .FirstOrDefaultAsync();

            return subServiceId == 0 ? (int?)null : subServiceId;
        }

        //  Получение ID мастеров по подуслуге
        public async Task<List<int>> GetMasterIdsBySubServiceIdAsync(int subServiceId)
        {
            return await _context.SubServiceMasters
                .Where(ssm => ssm.SubServiceId == subServiceId)
                .Select(ssm => ssm.MasterId)
                .ToListAsync();
        }

        //  Получение мастеров с полной информацией
        public async Task<List<Master>> GetMastersBySubServiceIdAsync(int subServiceId)
        {
            return await _context.SubServiceMasters
                .Where(ssm => ssm.SubServiceId == subServiceId)
                .Include(ssm => ssm.Master)
                .Select(ssm => ssm.Master)
                .ToListAsync();
        }

        //  Создание связи подуслуги и мастера
        public async Task<SubServiceMaster> CreateSubServiceMasterAsync(SubServiceMaster ssm)
        {
            _context.SubServiceMasters.Add(ssm);
            await _context.SaveChangesAsync();
            return ssm;
        }
       
    }
}
