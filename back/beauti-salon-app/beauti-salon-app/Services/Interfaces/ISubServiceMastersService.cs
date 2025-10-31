using beauti_salon_app.Models;

namespace beauti_salon_app.Services.Interfaces
{
    public interface ISubServiceMastersService
    {
        Task<SubServiceMaster> CreateAsync(SubServiceMaster ssm);
    }

}
