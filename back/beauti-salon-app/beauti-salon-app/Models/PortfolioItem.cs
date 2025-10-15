using beauti_salon_app.Models;
using System.Text.Json.Serialization;

public class PortfolioItem
{
    public int Id { get; set; }
    public string PhotoUrl { get; set; }
    public bool? TopPhoto { get; set; } = false;

    // Внешний ключ к мастеру
    public int MasterId { get; set; }
    [JsonIgnore]
    public Master? Master { get; set; }
}
