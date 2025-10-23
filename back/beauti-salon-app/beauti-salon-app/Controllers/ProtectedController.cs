using beauti_salon_app.Data;
using beauti_salon_app.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace beauti_salon_app.Controllers
{
    [Route("api/protected")]
    [ApiController]
    public class ProtectedController : ControllerBase
    {
        private readonly BeautySalonContext _context;

        public ProtectedController(BeautySalonContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetSecretData()
        {
            var authorizationHeader = Request.Headers["Authorization"].ToString();

            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                return Unauthorized(new { message = "Token is missing or invalid." });
            }

            var token = authorizationHeader.Substring(7);


            var user = await _context.Users.FirstOrDefaultAsync(u => u.Token == token);

            if (user == null)
            {
                return NotFound(new { message = "Данных о пользователе нет." });
            }

            var response = new LoginResponse
            {
                Username = user.Username,
                Token = user.Token,
                RoleName = user.RoleName.ToString(),
            };

            return Ok(response);
        }
    }
}
