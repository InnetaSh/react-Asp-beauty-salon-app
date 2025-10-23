using System.Text.Json.Serialization;

namespace beauti_salon_app.Models
{
    public class Client:User
    {
        public string RoleName { get; set; } = "Client";
        public string? Contact { get; set; }

        public int BonusCount { get; set; } = 0;
        [JsonIgnore]
        public List<OrderService> OrderServices { get; set; } = new();
        public List<OrderProduct> OrderProducts { get; set; } = new();
    }
}
