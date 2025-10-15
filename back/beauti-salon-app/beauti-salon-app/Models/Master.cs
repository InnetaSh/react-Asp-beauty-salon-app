using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace beauti_salon_app.Models
{


    public class Master
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Experience { get; set; }
        public string Description { get; set; }
        public string ImageSrc { get; set; }
        public string Specialization { get; set; }
        public bool? TopMaster { get; set; } = false;

        // Навигационное свойство для связки с подуслугами
        public List<SubServiceMaster> SubServiceMasters { get; set; } = new();

        public List<PortfolioItem> PortfolioItems { get; set; } = new();

        public List<OrderService> OrderServices { get; set; } = new();
    }

    
}
