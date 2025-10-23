using beauti_salon_app.Data;
using beauti_salon_app.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace beauti_salon_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly BeautySalonContext _context;
        private readonly ITokenService _tokenService;

        public AuthController(BeautySalonContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username && u.Password == request.Password);

            if (user == null)
                return Unauthorized("Неверное имя пользователя или пароль");

            var token = _tokenService.GenerateJwtToken(user);

            return Ok(new
            {
                token,
                role = user.RoleName,
                username = user.Username
            });
        }
    }

    public class LoginRequest
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }

}
