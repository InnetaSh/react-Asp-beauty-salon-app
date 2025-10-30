using beauti_salon_app.Models;
using beauti_salon_app.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace beauti_salon_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PortfolioController : ControllerBase
    {
        private readonly IPortfolioService _portfolioService;
        private readonly IMasterService _masterService;

        public PortfolioController(IPortfolioService portfolioService, IMasterService masterService)
        {
            _portfolioService = portfolioService;
            _masterService = masterService;
        }

        //  GET: api/portfolio
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PortfolioItem>>> GetAllPortfolioItems()
        {
            var items = await _portfolioService.GetAllAsync();
            return Ok(items);
        }

        //  GET: api/portfolio/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PortfolioItem>> GetPortfolioItemById(int id)
        {
            var item = await _portfolioService.GetByIdAsync(id);
            if (item == null)
                return NotFound(new { message = "Portfolio item not found" });

            return Ok(item);
        }

        //  GET: api/portfolio/master/{masterId}
        [HttpGet("master/{masterId}")]
        public async Task<ActionResult<IEnumerable<PortfolioItem>>> GetByMasterId(int masterId)
        {
            var masterExists = await _masterService.ExistsAsync(masterId);
            if (!masterExists)
                return NotFound(new { message = "Master not found" });

            var items = await _portfolioService.GetByMasterIdAsync(masterId);
            return Ok(items);
        }

        //  POST: api/portfolio
        [HttpPost]
        public async Task<ActionResult<PortfolioItem>> CreatePortfolioItem([FromBody] PortfolioItem portfolioItem)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var masterExists = await _masterService.ExistsAsync(portfolioItem.MasterId);
            if (!masterExists)
                return NotFound(new { message = "Master not found" });

            var createdItem = await _portfolioService.CreateAsync(portfolioItem);

            return CreatedAtAction(nameof(GetPortfolioItemById), new { id = createdItem.Id }, createdItem);
        }

        //  PUT: api/portfolio/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePortfolioItem(int id, [FromBody] PortfolioItem updatedItem)
        {
            if (id != updatedItem.Id)
                return BadRequest(new { message = "ID in URL does not match ID in body" });

            var exists = await _portfolioService.ExistsAsync(id);
            if (!exists)
                return NotFound(new { message = "Portfolio item not found" });

            var success = await _portfolioService.UpdateAsync(id, updatedItem);
            if (!success)
                return StatusCode(500, new { message = "Error updating portfolio item" });

            return NoContent();
        }

        //  DELETE: api/portfolio/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePortfolioItem(int id)
        {
            var exists = await _portfolioService.ExistsAsync(id);
            if (!exists)
                return NotFound(new { message = "Portfolio item not found" });

            var success = await _portfolioService.DeleteAsync(id);
            if (!success)
                return StatusCode(500, new { message = "Error deleting portfolio item" });

            return NoContent();
        }

        //  GET: api/portfolio/count
        [HttpGet("count")]
        public async Task<ActionResult<int>> GetPortfolioCount()
        {
            var count = await _portfolioService.GetCountAsync();
            return Ok(count);
        }
    }
}
