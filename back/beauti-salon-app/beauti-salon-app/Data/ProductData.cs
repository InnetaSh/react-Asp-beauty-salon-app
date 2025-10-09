using beauti_salon_app.Models;

namespace beauti_salon_app.Data
{
    public static class ProductData
    {
        public static List<Product> Products => new List<Product>
        {
            new Product
            {
                Id = 1,
                ImageSrc = "/img/Products/p1-510x510.jpg",
                Title = "HAIR DRYER",
                Price = "$79.00",
                NewPrice = ""
            },
            new Product
            {
                Id = 2,
                ImageSrc = "/img/Products/p2-510x510.jpg",
                Title = "HAIR COMB",
                Price = "$39.00",
                NewPrice = "$29.00"
            },
            new Product
            {
                Id = 3,
                ImageSrc = "/img/Products/p3-510x510.jpg",
                Title = "HAIR STRAIGHTENER",
                Price = "$59.00",
                NewPrice = ""
            },
            new Product
            {
                Id = 4,
                ImageSrc = "/img/Products/p5-510x510.jpg",
                Title = "MANICURE TWEEZERS",
                Price = "$19.00",
                NewPrice = ""
            },
            new Product
            {
                Id = 5,
                ImageSrc = "/img/Products/sp-510x510.jpg",
                Title = "SIMPLE PRODUCT",
                Price = "$119.00",
                NewPrice = ""
            }
        };
    }
}