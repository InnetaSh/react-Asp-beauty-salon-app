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
    public class MastersController : ControllerBase
    {

        private readonly IMasterService _masterService;

        public MastersController(IMasterService masterService)
        {
            _masterService = masterService;
        }

        // GET: api/masters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Master>>> GetAllMasters()
        {
            var items = await _masterService.GetAllAsync();
            return Ok(items);
        }

        // GET: api/masters/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Master>> GetMasterById(int id)
        {
            var item = await _masterService.GetByIdAsync(id);

            if (item == null)
                return NotFound(new { message = "Master not found" });

            return Ok(item);
        }

        // POST: api/masters
        [HttpPost]
        public async Task<ActionResult<Master>> CreateMaster([FromBody]  Master master)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var masterExists = await _masterService.ExistsAsync(master.Id);
            if (!masterExists)
                return NotFound(new { message = "Master not found" });

            var createdItem = await _masterService.CreateAsync(master);

            return CreatedAtAction(nameof(GetMasterById), new { id = createdItem.Id }, createdItem);

        }


        // PUT: api/masters/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMaster(int id, [FromBody]  Master updatedMaster)
        {
            if (id != updatedMaster.Id)
                return BadRequest(new { message = "ID in URL does not match ID in body" });

            var existingMaster = await _masterService.ExistsAsync(updatedMaster.Id);
            if (existingMaster == null)
                return NotFound(new { message = "Master not found" });

            var success = await _masterService.UpdateAsync(id, updatedMaster);
            if (!success)
                return StatusCode(500, new { message = "Error updating portfolio item" });

            return NoContent();
        }


      


        // DELETE: api/masters/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaster(int id)
        {
            var existingMaster = await _masterService.ExistsAsync(id);
            if (existingMaster == null)
                return NotFound(new { message = "Master not found" });


            var success = await _masterService.DeleteAsync(id);
            if (!success)
                return StatusCode(500, new { message = "Error deleting master" });

            return NoContent();
        }


        //  GET: api/master/count
        [HttpGet("count")]
        public async Task<ActionResult<int>> GetPortfolioCount()
        {
            var count = await _masterService.GetCountAsync();
            return Ok(count);
        }


        
    }
}
