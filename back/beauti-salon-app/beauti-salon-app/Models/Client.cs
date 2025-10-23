using System.Text.Json.Serialization;
using beauti_salon_app.Models.Enums;

namespace beauti_salon_app.Models
{
    public class Client:User
    {
        public UserRole RoleName { get; set; } = UserRole.Client;
 

        public int BonusCount { get; set; } = 0;
        [JsonIgnore]
        public List<OrderService> OrderServices { get; set; } = new();
        public List<OrderProduct> OrderProducts { get; set; } = new();
    }
}
