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
        public string Photo { get; set; }
        public string Specialization { get; set; }

        // Навигационное свойство для связки с подуслугами
        public List<SubServiceMaster> SubServiceMasters { get; set; } = new();
    }

    
}
