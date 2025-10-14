using beauti_salon_app.Models;

public class PortfolioItem
{
    public int Id { get; set; }
    public string PhotoUrl { get; set; }
    public bool? TopPhoto { get; set; } = false;

    // Внешний ключ к мастеру
    public int MasterId { get; set; }
    public Master Master { get; set; }
}
