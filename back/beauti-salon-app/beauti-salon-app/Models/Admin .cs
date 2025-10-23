using beauti_salon_app.Models.Enums;

namespace beauti_salon_app.Models
{
    public class Admin : User
    {
        public UserRole RoleName { get; set; } = UserRole.Admin;

    }
}
