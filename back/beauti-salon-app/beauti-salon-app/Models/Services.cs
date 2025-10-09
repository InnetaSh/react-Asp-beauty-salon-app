namespace beauti_salon_app.Models
{
    public class Services
    {
        public int Id { get; set; }
        public string ImageSrc { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Price { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;
    }
}
