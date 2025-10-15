using beauti_salon_app.Data;
using beauti_salon_app.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace beauti_salon_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderServicesController : ControllerBase
    {
        private readonly BeautySalonContext _context;

        public OrderServicesController(BeautySalonContext context)
        {
            _context = context;
        }

        // POST: api/OrderServices
        [HttpPost]
        public async Task<ActionResult<OrderService>> CreateOrderService(OrderService order)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

          
            var masterExists = await _context.Masters.AnyAsync(m => m.Id == order.MasterId);
            var subServiceExists = await _context.SubServices.AnyAsync(s => s.Id == order.SubServiceId);

            if (!masterExists || !subServiceExists)
            {
                return BadRequest(new { message = "Invalid MasterId or SubServiceId" });
            }

            _context.OrderServices.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
        }

        // GET: api/OrderServices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderService>> GetOrderById(int id)
        {
            var order = await _context.OrderServices
                .Include(o => o.Master)
                .Include(o => o.SubService)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound();

            return Ok(order);
        }
    }
}
