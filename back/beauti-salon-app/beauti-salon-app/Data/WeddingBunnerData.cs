using beauti_salon_app.Models;

namespace beauti_salon_app.Data
{
    public static class WeddingBunnerData
    {
        public static List<WeddingBunner> Bunners => new List<WeddingBunner>
        {
            new WeddingBunner
            {
                Id = 1,
                ImageSrc = "/img/Wedding Styling/ss.jpg",
                Title = "Wedding Styling",
                Description = "Sustainable forage master cleanse vinyl cornhole meditation. Gentrify meggings XOXO hashtag brunch. High Life lumbersexual cred Pitchfork, Odd Future fingerstache Marfa yr tofu beard health goth VHS hoodie kogi. Seitan twee High Life listicle. Gentrify narwhal aesthetic Post-ironic mumblecore authentic, stumptown try-hard chambray sartorial McSweeney’s VHS put a bird."
            }
        };
    }
}

