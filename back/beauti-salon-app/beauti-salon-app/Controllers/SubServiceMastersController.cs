using beauti_salon_app.Models;
using beauti_salon_app.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace beauti_salon_app.Controllers
{
    public class SubServiceMastersController : Controller
    {

        private readonly ISubServiceMastersService _subServiceMastersService;
        public SubServiceMastersController(ISubServiceMastersService subServiceMastersService)
        {
            _subServiceMastersService = subServiceMastersService;
        }
        [HttpPost("subservicemasters")]
        public async Task<ActionResult<SubServiceMaster>> CreateSubServiceMaster([FromBody] SubServiceMaster ssm)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdSsm = await _subServiceMastersService.CreateAsync(ssm);
            return Ok(createdSsm);
        }
    }
}
