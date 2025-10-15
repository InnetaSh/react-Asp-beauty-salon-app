using System.ComponentModel.DataAnnotations;

namespace beauti_salon_app.Models
{
    public class OrderService
    {
        public int Id { get; set; }


        public string ClientName { get; set; }

        public string? Contact { get; set; }

        public DateOnly AppointmentDate { get; set; }

        public TimeOnly AppointmentTime { get; set; }

        public int MasterId { get; set; }
        public Master Master { get; set; }

    
        public int SubServiceId { get; set; }
        public SubService SubService { get; set; }


        public string Status { get; set; } = "Pending"; 
    }
}
