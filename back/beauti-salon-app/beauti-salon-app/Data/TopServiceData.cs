using beauti_salon_app.Models;

namespace beauti_salon_app.Data
{
    public static class TopServiceData
    {
        public static List<TopServices> TopServices => new List<TopServices>
        {
            new TopServices
            {
                Id = 1,
                ImageSrc = "/img/Header/sl02-1.jpg",
                Title = "PROFFESIONAL MAKEUP",
                Description = "LET OUR EXPERTS TREAT YOU FOR THIS SPECIAL OCCASION"
            },
            new TopServices
            {
                Id = 2,
                ImageSrc = "/img/Header/sl01a.jpg",
                Title = "HAIR STYLING",
                Description = "BEST SERVICE & AFFORDABLE PRICES"
            },
            new TopServices
            {
                Id = 3,
                ImageSrc = "/img/Header/sl03.jpg",
                Title = "AROMATHERAPY",
                Description = "HARMONIZE AND PROMOTE THE HEALTH OF BODY & MIND"
            }
        };
    }
}

