namespace beauti_salon_app.Models
{
    public class Admin : User
    {
        public UserRole RoleName { get; set; } = UserRole.Admin;

        public DateTime? LastLogin { get; set; }
    }
}
