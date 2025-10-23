namespace beauti_salon_app.Models
{

    public enum UserRole
    {
        Admin,
        Master,
        Client
    }
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
}
