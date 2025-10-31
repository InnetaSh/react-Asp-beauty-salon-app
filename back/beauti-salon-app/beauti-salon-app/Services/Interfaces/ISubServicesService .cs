using beauti_salon_app.Models;

namespace beauti_salon_app.Services.Interfaces
{
    public interface ISubServicesService
    {
        Task<List<SubService>> GetAllAsync();
        Task<SubService?> GetByIdAsync(int id);
        Task<List<SubService>> GetByServiceIdAsync(int serviceId);
        Task<SubService> CreateAsync(SubService subService);
        Task<bool> UpdateAsync(int id, SubService updatedSubService);
        Task<bool> DeleteAsync(int id);
        Task<List<SubService>> GetTopServicesAsync();
        Task<bool> ExistsAsync(int id);
        Task<int> GetCountAsync();


        Task<int?> GetIdByTitleAsync(string title);
        Task<List<int>> GetMasterIdsBySubServiceIdAsync(int subServiceId);
        Task<List<Master>> GetMastersBySubServiceIdAsync(int subServiceId);
        Task<SubServiceMaster> CreateSubServiceMasterAsync(SubServiceMaster ssm);

    }
}
