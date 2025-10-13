using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace beauti_salon_app.Models
{

    public class SubServiceMaster
    {
        public int SubServiceId { get; set; }
        [JsonIgnore]
        public SubService? SubService { get; set; }

        public int MasterId { get; set; }
        [JsonIgnore]
        public Master? Master { get; set; }
    }
}
