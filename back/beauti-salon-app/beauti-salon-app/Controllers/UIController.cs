using Microsoft.AspNetCore.Mvc;
using beauti_salon_app.Models;
using beauti_salon_app.Data;

namespace beauti_salon_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UIController : ControllerBase
    {
        [HttpGet("services")]
        public IActionResult GetServices()
        {
            return Ok(ServiceData.Services);
        }

        [HttpGet("top-services")]
        public IActionResult GetTopServices()
        {
            return Ok(TopServiceData.TopServices);
        }

        [HttpGet("wedding")]
        public IActionResult GetWeddingBunners()
        {
            return Ok(WeddingBunnerData.Bunners);
        }

        [HttpGet("team")]
        public IActionResult GetTeam()
        {
            return Ok(TeamData.Members);
        }

        [HttpGet("ourWork")]
        public IActionResult GetWork()
        {
            return Ok(OurWorkData.Works);
        }

        [HttpGet("products")]
        public IActionResult GetProducts()
        {
            return Ok(ProductData.Products);
        }
        [HttpGet("infoText")]
        public IActionResult GetInfoText()
        {
            return Ok(InfoTextData.Texts);
        }
        [HttpGet("name")]
        public IActionResult GetName()
        {
            return Ok(NameData.NameTitle);
        }
    }
}