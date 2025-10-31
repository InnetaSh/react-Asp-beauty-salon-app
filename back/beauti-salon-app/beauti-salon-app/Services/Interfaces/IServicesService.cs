using beauti_salon_app.Models;

namespace beauti_salon_app.Services.Interfaces
{
    public interface IServicesService
    {
        Task<List<Service>> GetAllAsync();
        Task<Service?> GetByIdAsync(int id);
        Task<Service> CreateAsync(Service service);
        Task<bool> UpdateAsync(int id, Service updatedService);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
        Task<int> GetCountAsync();
    }
}
