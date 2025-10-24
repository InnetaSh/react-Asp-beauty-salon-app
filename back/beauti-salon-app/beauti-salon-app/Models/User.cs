using beauti_salon_app.Models.Enums;
using System.ComponentModel.DataAnnotations;
namespace beauti_salon_app.Models
{


    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Username { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();

        [Required]
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string Token { get; set; }
        [Required]
        public UserRole RoleName { get; set; }

        public DateTime? LastLogin { get; set; }
    }

    //------------------------------------------------------
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class RegisterRequest
    {
     
        public string? Username { get; set; }

        public string Password { get; set; }

        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? RoleName { get; set; }
    }


        public class TokenRequest
    {
        public string Token { get; set; }
    }

    public class LoginResponse
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public string RoleName { get; set; }
    }
    public class RegisterResponse
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public string RoleName { get; set; }
    }
}
