using beauti_salon_app.Data;
using beauti_salon_app.Models;
using beauti_salon_app.Services.Interfaces;

namespace beauti_salon_app.Services
{
    public class SubServiceMastersService : ISubServiceMastersService
    {
        private readonly BeautySalonContext _context;

        public SubServiceMastersService(BeautySalonContext context)
        {
            _context = context;
        }

        public async Task<SubServiceMaster> CreateAsync(SubServiceMaster ssm)
        {
            _context.SubServiceMasters.Add(ssm);
            await _context.SaveChangesAsync();
            return ssm;
        }
    }

}
