using beauti_salon_app.Models.Enums;
namespace beauti_salon_app.Models
{


    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string Token { get; set; }

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
        public string? Password { get; set; }
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
