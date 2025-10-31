using beauti_salon_app.Data;
using beauti_salon_app.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace beauti_salon_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MastersOldController : ControllerBase
    {
        private readonly BeautySalonContext _context;

        public MastersOldController(BeautySalonContext context)
        {
            _context = context;
        }

        // GET: api/masters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Master>>> GetAllMasters()
        {
            // Включаем PortfolioItems через Include
            var masters = await _context.Masters
                .Include(m => m.PortfolioItems)
                .ToListAsync();
            return Ok(masters);
        }

        // GET: api/masters/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Master>> GetMasterById(int id)
        {
            // Загружаем мастера с портфолио
            var master = await _context.Masters
                .Include(m => m.PortfolioItems)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (master == null)
                return NotFound(new { message = "Master not found" });

            return Ok(master);
        }

        // PUT: api/masters/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMaster(int id, Master updatedMaster)
        {
            if (id != updatedMaster.Id)
                return BadRequest(new { message = "ID in URL does not match ID in body" });

            var existingMaster = await _context.Masters.FindAsync(id);
            if (existingMaster == null)
                return NotFound(new { message = "Master not found" });

            existingMaster.Name = updatedMaster.Name;
            existingMaster.Experience = updatedMaster.Experience;
            existingMaster.Description = updatedMaster.Description;
            existingMaster.ImageSrc = updatedMaster.ImageSrc;
            existingMaster.Specialization = updatedMaster.Specialization;
            existingMaster.TopMaster = updatedMaster.TopMaster;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, new { message = "Error updating master" });
            }

            return Ok();
        }


        // POST: api/masters
        [HttpPost]
        public async Task<ActionResult<Master>> CreateMaster(Master master)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Masters.Add(master);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMasterById), new { id = master.Id }, master);
        }


        // DELETE: api/masters/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaster(int id)
        {
            var master = await _context.Masters.FindAsync(id);
            if (master == null)
                return NotFound(new { message = "Master not found" });

            _context.Masters.Remove(master);
            await _context.SaveChangesAsync();

            return NoContent(); 
        }



        // POST: api/masters/{masterId}/portfolio
        [HttpPost("{masterId}/portfolio")]
        public async Task<ActionResult<PortfolioItem>> AddPortfolioItem(int masterId, PortfolioItem portfolioItem)
        {
            if (masterId != portfolioItem.MasterId)
                return BadRequest(new { message = "MasterId mismatch" });

            var masterExists = await _context.Masters.AnyAsync(m => m.Id == masterId);
            if (!masterExists)
                return NotFound(new { message = "Master not found" });

            _context.PortfolioItems.Add(portfolioItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMasterById), new { id = masterId }, portfolioItem);
        }

       
        // GET: api/masters/{masterId}/portfolio
        [HttpGet("{masterId}/portfolio")]
        public async Task<ActionResult<IEnumerable<PortfolioItem>>> GetPortfolioItems(int masterId)
        {
            var masterExists = await _context.Masters.AnyAsync(m => m.Id == masterId);
            if (!masterExists)
                return NotFound(new { message = "Master not found" });

            var portfolioItems = await _context.PortfolioItems
                .Where(p => p.MasterId == masterId)
                .ToListAsync();

            return Ok(portfolioItems);
        }

        // GET: api/masters/portfolio
        [HttpGet("portfolio")]
        public async Task<ActionResult<IEnumerable<PortfolioItem>>> GetAllPortfolioItems()
        {
            var portfolioItems = await _context.PortfolioItems
                .Include(p => p.Master) 
                .ToListAsync();

            return Ok(portfolioItems);
        }

        // PUT: api/masters/portfolio/{id}
   
        [HttpPut("portfolio/{id}")]
        public async Task<IActionResult> UpdatePortfolioItem(int id, [FromBody] PortfolioItem updatedItem)

        {
            if (id != updatedItem.Id)
                return BadRequest(new { message = "ID in URL does not match ID in body" });

            var existingItem = await _context.PortfolioItems.FindAsync(id);
            if (existingItem == null)
                return NotFound(new { message = "Portfolio item not found" });


            existingItem.ImageSrc = updatedItem.ImageSrc;
            existingItem.TopPhoto = updatedItem.TopPhoto;
            existingItem.MasterId = updatedItem.MasterId;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, new { message = "Error updating portfolio item" });
            }

            return NoContent(); 
        }


        // DELETE: api/masters/portfolio/{id}

        [HttpDelete("portfolio/{id}")]
        public async Task<IActionResult> DeletePortfolioItem(int id)
        {
            var item = await _context.PortfolioItems.FindAsync(id);
            if (item == null)
                return NotFound(new { message = "Portfolio item not found" });

            _context.PortfolioItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent(); 
        }


    }
}
