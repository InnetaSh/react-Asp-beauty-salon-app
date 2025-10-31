using beauti_salon_app.Data;
using beauti_salon_app.Models;
using beauti_salon_app.Services;
using beauti_salon_app.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace beauti_salon_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly IServicesService _serviceService;

        public ServicesController(IServicesService serviceService)
        {
            _serviceService = serviceService;
        }

        // GET: api/Services
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Service>>> GetAllServices()
        {
            var items = await _serviceService.GetAllAsync();
            return Ok(items);
        }

        // GET: api/Services/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Service>> GetServiceById(int id)
        {
            var item = await _serviceService.GetByIdAsync(id);

            if (item == null)
                return NotFound(new { message = "Service not found" });

            return Ok(item);
        }

    
  
        // POST: api/Services
        [HttpPost]
        public async Task<ActionResult<Service>> CreateService([FromBody] Service service)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var serviceExists = await _serviceService.ExistsAsync(service.Id);
            if (serviceExists)
                    return Conflict(new { message = "Service with this ID already exists" });


            var createdItem = await _serviceService.CreateAsync(service);

            return CreatedAtAction(nameof(GetServiceById), new { id = createdItem.Id }, createdItem);
        }

 
   

        // PUT: api/Services/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateService(int id, Service updatedService)
        {
            if (id != updatedService.Id)
                return BadRequest("ID in URL does not match ID in body");


            var existingSubService = await _serviceService.ExistsAsync(updatedService.Id);
            if (!existingSubService)
                return NotFound(new { message = "SubService not found" });

            var success = await _serviceService.UpdateAsync(id, updatedService);
            if (!success)
                return StatusCode(500, new { message = "Error updating portfolio item" });

            return NoContent();
        }




        // DELETE: api/Services/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService(int id)
        {
            var existingSubService = await _serviceService.ExistsAsync(id);
            if (!existingSubService)
                return NotFound(new { message = "SubService not found" });


            var success = await _serviceService.DeleteAsync(id);
            if (!success)
                return StatusCode(500, new { message = "Error deleting subService" });

            return NoContent();

            return NoContent(); 
        }





    }
}
