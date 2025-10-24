using beauti_salon_app.Data;
using beauti_salon_app.Models;
using beauti_salon_app.Models.Enums;
using beauti_salon_app.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;



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
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
                return Unauthorized("Неверное имя пользователя или пароль");

            if (!VerifyPassword(request.Password, user.PasswordHash, user.PasswordSalt))
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

            UserRole role;
            if (!Enum.TryParse<UserRole>(request.RoleName, true, out role))
            {
                role = UserRole.Client;
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var newUser = new User
            {
                Username = request.Username,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                RoleName = role,
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


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound(new { message = "Пользователь не найден." });

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Пользователь '{user.Username}' успешно удалён." });
        }

        // ----------------------
        private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            using (var hmac = new HMACSHA512())
            {
                salt = hmac.Key; 
                hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt)
        {
            using (var hmac = new HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(storedHash);
            }
        }
    }
}

   







