using beauti_salon_app.Models;

namespace beauti_salon_app.Services.Interfaces
{
    public interface IPortfolioService
    {
        Task<List<PortfolioItem>> GetAllAsync();
        Task<List<PortfolioItem>> GetByMasterIdAsync(int id);
        Task<PortfolioItem> GetByIdAsync(int id);
        Task<PortfolioItem> CreateAsync(PortfolioItem portfolioItem);
        Task<bool> UpdateAsync(int id, PortfolioItem updatedPortfolioItem);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
        Task<int> GetCountAsync();
    }
}
