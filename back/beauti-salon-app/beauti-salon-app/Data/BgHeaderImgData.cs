using beauti_salon_app.Models;

namespace beauti_salon_app.Data
{
    public static class BgHeaderImgData
    {
        public static List<TopServices> bgHeader => new List<TopServices>
        {
            new TopServices
            {
                Id = 1,
                ImageSrc = "/img/header-bg.jpg",
                Title = "",
                Description = ""
            }
        };
    }
}

