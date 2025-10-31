using beauti_salon_app.Data;
using beauti_salon_app.Models;
using beauti_salon_app.Services;
using beauti_salon_app.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Threading.Tasks;

namespace beauti_salon_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubServiceController : ControllerBase
    {

        private readonly ISubServicesService _subServiceService;

        public SubServiceController(ISubServicesService subServiceService)
        {
            _subServiceService = subServiceService;
        }

        // GET: api/subService
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubService>>> GetAllSubService()
        {
            var items = await _subServiceService.GetAllAsync();
            return Ok(items);
        }

        // GET: api/subService/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<SubService>> GetSubServiceById(int id)
        {
            var item = await _subServiceService.GetByIdAsync(id);

            if (item == null)
                return NotFound(new { message = "SubService not found" });

            return Ok(item);
        }

        // POST: api/subService
        [HttpPost]
        public async Task<ActionResult<SubService>> CreateSubService([FromBody] SubService subService)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var subServiceExists = await _subServiceService.ExistsAsync(subService.Id);
            if (subServiceExists)
                return Conflict(new { message = "SubService with this ID already exists" });

            var createdItem = await _subServiceService.CreateAsync(subService);

            return CreatedAtAction(nameof(GetSubServiceById), new { id = createdItem.Id }, createdItem);

        }


        // PUT: api/subService/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubService(int id, [FromBody] SubService updatedSubService)
        {
            if (id != updatedSubService.Id)
                return BadRequest(new { message = "ID in URL does not match ID in body" });

            var existingSubService = await _subServiceService.ExistsAsync(updatedSubService.Id);
            if (!existingSubService)
                return NotFound(new { message = "SubService not found" });

            var success = await _subServiceService.UpdateAsync(id, updatedSubService);
            if (!success)
                return StatusCode(500, new { message = "Error updating portfolio item" });

            return NoContent();
        }





        // DELETE: api/subService/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubService(int id)
        {
            var existingSubService = await _subServiceService.ExistsAsync(id);
            if (!existingSubService)
                return NotFound(new { message = "SubService not found" });


            var success = await _subServiceService.DeleteAsync(id);
            if (!success)
                return StatusCode(500, new { message = "Error deleting subService" });

            return NoContent();
        }


        //  GET: api/subService/count
        [HttpGet("count")]
        public async Task<ActionResult<int>> GetPortfolioCount()
        {
            var count = await _subServiceService.GetCountAsync();
            return Ok(count);
        }





        //  Получить все подуслуги по ID основной услуги
        [HttpGet("service/{serviceId:int}")]
        public async Task<ActionResult<IEnumerable<SubService>>> GetSubServicesByServiceId(int serviceId)
        {
            var subServices = await _subServiceService.GetByServiceIdAsync(serviceId);
            return Ok(subServices);
        }

        //  Получить топ-5 подуслуг (например, по цене)
        [HttpGet("top")]
        public async Task<ActionResult<IEnumerable<SubService>>> GetTopSubServices()
        {
            var topServices = await _subServiceService.GetTopServicesAsync();
            return Ok(topServices);
        }

        //  Получить ID подуслуги по названию
        [HttpGet("id-by-title/{title}")]
        public async Task<ActionResult<int?>> GetSubServiceIdByTitle(string title)
        {
            var id = await _subServiceService.GetIdByTitleAsync(title);
            if (id == null)
                return NotFound(new { message = "SubService not found with this title" });

            return Ok(id);
        }

        //  Получить мастеров по ID подуслуги
        [HttpGet("{subServiceId:int}/masters")]
        public async Task<ActionResult<IEnumerable<Master>>> GetMastersBySubServiceId(int subServiceId)
        {
            var masters = await _subServiceService.GetMastersBySubServiceIdAsync(subServiceId);
            return Ok(masters);
        }

        //  Получить только ID мастеров по ID подуслуги
        [HttpGet("{subServiceId:int}/masters/full")]
        public async Task<ActionResult<IEnumerable<Master>>> GetMasterIdsBySubServiceId(int subServiceId)
        {
            var masters = await _subServiceService.GetMastersBySubServiceIdAsync(subServiceId);
            return Ok(masters);
        }


    }
}
