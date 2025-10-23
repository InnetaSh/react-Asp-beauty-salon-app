using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace beauti_salon_app.Models
{
    public enum ProductClassType
    {
        Натуральная = 1,
        Элитная = 2,
        Аптечная = 3,
        Профессиональная = 4
    }

    public enum ProductCategory
    {
        Макияж = 1,
        УходЗаЛицом = 2,
        УходЗаВолосами = 3,
        УходЗаТелом = 4,
        Ногти = 5
    }

    public class Product
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Название продукта обязательно")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Цена обязательна")]
        [Range(0, double.MaxValue, ErrorMessage = "Цена должна быть положительной")]
        public decimal Price { get; set; }

 
        [Required(ErrorMessage = "Категория обязательна")]
        public string Category { get; set; }


        [Required(ErrorMessage = "Класс продукта обязателен")]
        public ProductClassType ProductClass { get; set; } = ProductClassType.Натуральная;

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }
    }
}
