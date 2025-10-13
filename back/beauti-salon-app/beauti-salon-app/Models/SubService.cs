using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace beauti_salon_app.Models
{
   
    public class SubService
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }             
        public string Description { get; set; }
        public string Price { get; set; }

        // Внешний ключ к родительскому Service
        public int ServiceId { get; set; }
        [JsonIgnore]
        public Service? Service { get; set; }

        // Навигационное свойство к мастерам
        public List<SubServiceMaster> SubServiceMasters { get; set; } = new();
    }

    
}
