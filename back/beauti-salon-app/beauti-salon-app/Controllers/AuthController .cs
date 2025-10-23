using beauti_salon_app.Data;
using beauti_salon_app.Models;
using beauti_salon_app.Models.Enums;
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


            var response = new LoginResponse
            {
                Username = user.Username,
                Token = token,
                RoleName = user.RoleName.ToString(),
            };

            return Ok(response);
          
        }
    

   
    [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
        
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if (existingUser != null)
                return BadRequest("Пользователь с таким именем уже существует");

           
            var newUser = new User
            {
                Username = request.Username,
                Password = request.Password,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                RoleName = UserRole.Client, 
                Token = "", 
                LastLogin = null
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

           
            var token = _tokenService.GenerateJwtToken(newUser);

            var response = new RegisterResponse
            {
                Username = newUser.Username,
                Token = token,
                RoleName = newUser.RoleName.ToString(),
            };

            return Ok(response);
        }
    }

   


}




