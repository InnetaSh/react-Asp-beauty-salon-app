using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using beauti_salon_app.Data;
using beauti_salon_app.Models;

namespace beauti_salon_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly BeautySalonContext _context;

        public ServicesController(BeautySalonContext context)
        {
            _context = context;
        }

        // GET: api/Services
        // 👉 Получить все сервисы с подуслугами и мастерами
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Service>>> GetAllServices()
        {
            var services = await _context.Services
                .Include(s => s.SubServices)
                    .ThenInclude(ss => ss.SubServiceMasters)
                        .ThenInclude(sm => sm.Master)
                .ToListAsync();

            return Ok(services);
        }

        // GET: api/Services/{id}
        // 👉 Получить один сервис по Id с подуслугами и мастерами
        [HttpGet("{id}")]
        public async Task<ActionResult<Service>> GetServiceById(int id)
        {
            var service = await _context.Services
                .Include(s => s.SubServices)
                    .ThenInclude(ss => ss.SubServiceMasters)
                        .ThenInclude(sm => sm.Master)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (service == null)
                return NotFound(new { message = "Service not found" });

            return Ok(service);
        }

        // GET: api/Services/{id}/subservices
        // 👉 Получить все подуслуги конкретного сервиса
        [HttpGet("{id}/subservices")]
        public async Task<ActionResult<IEnumerable<SubService>>> GetSubServices(int id)
        {
            var subServices = await _context.SubServices
                .Include(ss => ss.SubServiceMasters)
                    .ThenInclude(sm => sm.Master)
                .Where(ss => ss.ServiceId == id)
                .ToListAsync();

            if (!subServices.Any())
                return NotFound(new { message = "No subservices found for this service" });

            return Ok(subServices);
        }

        // GET: api/Services/subservice/{id}
        // 👉 Получить конкретную подуслугу с мастерами
        [HttpGet("subservice/{id}")]
        public async Task<ActionResult<SubService>> GetSubServiceById(int id)
        {
            var subService = await _context.SubServices
                .Include(ss => ss.SubServiceMasters)
                    .ThenInclude(sm => sm.Master)
                .FirstOrDefaultAsync(ss => ss.Id == id);

            if (subService == null)
                return NotFound(new { message = "Subservice not found" });

            return Ok(subService);
        }


        //для создания нового сервиса с подуслугами
        // POST: api/Services
        [HttpPost]
        public async Task<ActionResult<Service>> CreateService(Service service)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Services.Add(service);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetServiceById), new { id = service.Id }, service);
        }

        //Создание подуслуги к сервису
        // POST: api/Services/{serviceId}/subservices
        [HttpPost("{serviceId}/subservices")]
        public async Task<ActionResult<SubService>> CreateSubService(int serviceId, SubService subService)
        {
            if (serviceId != subService.ServiceId)
                return BadRequest("Service ID mismatch");

            _context.SubServices.Add(subService);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSubServiceById), new { id = subService.Id }, subService);
        }

        //Связывание мастера с подуслугой
        [HttpPost("subservicemasters")]
        public async Task<ActionResult<SubServiceMaster>> CreateSubServiceMaster(SubServiceMaster ssm)
        {
            _context.SubServiceMasters.Add(ssm);
            await _context.SaveChangesAsync();
            return Ok(ssm);
        }

        // GET: api/Services/subservice/{subServiceId}/masters
        [HttpGet("subservice/{subServiceId}/masters")]
        public async Task<ActionResult<IEnumerable<int>>> GetMasterIdsBySubServiceId(int subServiceId)
        {
            var masterIds = await _context.SubServiceMasters
                .Where(ssm => ssm.SubServiceId == subServiceId)
                .Select(ssm => ssm.MasterId)
                .ToListAsync();

            if (masterIds == null || !masterIds.Any())
                return NotFound(new { message = "No masters found for this subservice" });

            return Ok(masterIds);
        }

        // GET: api/Services/subservice/{subServiceId}/masters/full
        [HttpGet("subservice/{subServiceId}/masters/full")]
        public async Task<ActionResult<IEnumerable<Master>>> GetMastersBySubServiceId(int subServiceId)
        {
            var masters = await _context.SubServiceMasters
                .Where(ssm => ssm.SubServiceId == subServiceId)
                .Include(ssm => ssm.Master)
                .Select(ssm => ssm.Master)
                .ToListAsync();

            if (masters == null || !masters.Any())
                return NotFound(new { message = "No masters found for this subservice" });

            return Ok(masters);
        }

        // PUT: api/Services/{id}
        // 👉 Обновление данных сервиса
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateService(int id, Service updatedService)
        {
            if (id != updatedService.Id)
                return BadRequest("ID in URL does not match ID in body");

            var existingService = await _context.Services.FindAsync(id);
            if (existingService == null)
                return NotFound(new { message = "Service not found" });

            // Обновляем поля (если нужно, можешь добавить проверку на null)
            existingService.Title = updatedService.Title;
            existingService.Description = updatedService.Description;
            existingService.ImageSrc = updatedService.ImageSrc;
            existingService.Category = updatedService.Category;
            existingService.Price = updatedService.Price;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Error updating the service");
            }

            return NoContent(); 
        }

        // GET: api/Services/subservice/by-title?title=Sports Massage
        [HttpGet("subservice/id-by-title")]
        public async Task<ActionResult<int>> GetSubServiceIdByTitle([FromQuery] string title)
        {
            if (string.IsNullOrWhiteSpace(title))
                return BadRequest(new { message = "Title is required" });

            var subServiceId = await _context.SubServices
                .Where(ss => ss.Title.ToLower() == title.ToLower())
                .Select(ss => ss.Id)
                .FirstOrDefaultAsync();

            if (subServiceId == 0)
                return NotFound(new { message = "SubService not found" });

            return Ok(new { id = subServiceId });
        }


    }
}
