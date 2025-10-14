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
    public class MastersController : ControllerBase
    {
        private readonly BeautySalonContext _context;

        public MastersController(BeautySalonContext context)
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

    }
}
