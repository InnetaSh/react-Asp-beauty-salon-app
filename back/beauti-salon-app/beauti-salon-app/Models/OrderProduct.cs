using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace beauti_salon_app.Models
{
    public class OrderProduct
    {
        public int Id { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public string Status { get; set; } = "Pending";

       
        [Required]
        public int ProductId { get; set; }

        [JsonIgnore]
        public Product? Product { get; set; }

     
        [Range(1, int.MaxValue, ErrorMessage = "Количество должно быть хотя бы 1")]
        public int Quantity { get; set; } = 1;

        [Range(0, double.MaxValue, ErrorMessage = "Сумма должна быть положительной")]
        public decimal TotalPrice { get; set; }

        // 🔹 Привязка к зарегистрированному клиенту
        public int? ClientId { get; set; }

        [JsonIgnore]
        public Client? Client { get; set; }

        // 🔹 Для гостевых заказов
        public string? ClientName { get; set; }
        public string? Contact { get; set; }

        // 🔹 Адрес и способ оплаты
        public string? DeliveryAddress { get; set; }
        public string? PaymentMethod { get; set; }
    }
}
