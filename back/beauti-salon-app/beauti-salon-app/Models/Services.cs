using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace beauti_salon_app.Models
{
    public class Service
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string? Description { get; set; }
        public string ImageSrc { get; set; }
        public string Category { get; set; }
        public string Price { get; set; }

        public bool? TopService { get; set; } = false;
        public List<SubService> SubServices { get; set; } = new();
    }

  
}
