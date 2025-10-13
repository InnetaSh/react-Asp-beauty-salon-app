using beauti_salon_app.Models;

namespace beauti_salon_app.Data
{
    public static class ServiceData
    {
        public static List<Service> Services => new List<Service>
        {
            new Service
            {
                Id = 1,
                ImageSrc = "/img/Services/aromatherapy.jpg",
                Title = "Aromatherapy",
                Price = "From $99",
                Category ="Personal Care"
            },
            new Service
            {
                Id = 2,
                ImageSrc = "/img/Services/body-massage.jpg",
                Title = "Body Massage",
                Price = "From $99/hour",
                Category ="Personal Care"

            },
            new Service
            {
                Id = 3,
                ImageSrc = "/img/Services/manicure-pedicure.jpg",
                Title = "Manicure & Pedicure",
                Price = "From $49",
                Category ="Manicure"
            }
        };
    }
}

