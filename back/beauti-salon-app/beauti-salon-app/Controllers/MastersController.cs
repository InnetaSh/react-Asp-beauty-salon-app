using beauti_salon_app.Data;
using beauti_salon_app.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var masters = await _context.Masters.ToListAsync();
            return Ok(masters);
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

        // GET: api/masters/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Master>> GetMasterById(int id)
        {
            var master = await _context.Masters.FindAsync(id);

            if (master == null)
                return NotFound(new { message = "Master not found" });

            return Ok(master);
        }
    }
}
