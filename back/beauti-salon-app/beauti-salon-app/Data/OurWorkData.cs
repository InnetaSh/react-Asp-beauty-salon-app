using beauti_salon_app.Models;

namespace beauti_salon_app.Data
{
    public class OurWorkData
    {
        public static List<OurWork> Works => new List<OurWork>
        {
            new OurWork
            {
                Id = 1,
                ImageSrc = "/img/Work/eyelash.jpg",
              
            },
            new OurWork
            {
                Id = 2,
                ImageSrc = "/img/Work/hair.jpg",
               
            },
            new OurWork
            {
                Id = 3,
                ImageSrc = "/img/Work/hair02.jpg",
                
            },
            new OurWork
            {
                Id = 4,
                ImageSrc = "/img/Work/hair06.jpg",

            },
            new OurWork
            {
                Id = 5,
                ImageSrc = "/img/Work/makeup.jpg",

            },
            new OurWork
            {
                Id = 6,
                ImageSrc = "/img/Work/media02.jpg",

            }
        };
    }
}
