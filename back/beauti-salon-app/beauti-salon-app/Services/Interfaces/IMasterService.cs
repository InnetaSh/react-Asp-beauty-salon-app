using beauti_salon_app.Models;

namespace beauti_salon_app.Services.Interfaces
{
    public interface IMasterService
    {
        Task<List<Master>> GetAllAsync();
        Task<Master?> GetByIdAsync(int id);
        Task<Master> CreateAsync(Master master);
        Task<bool> UpdateAsync(int id, Master updatedMaster);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
        Task<List<Master>> GetTopMastersAsync();
        Task<List<Master>> GetBySubServiceIdAsync(int subServiceId);
        Task<int> GetCountAsync();
    }
}
