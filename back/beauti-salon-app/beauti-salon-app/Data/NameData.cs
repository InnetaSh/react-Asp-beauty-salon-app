using beauti_salon_app.Models;

namespace beauti_salon_app.Data
{
    public class NameData
    {
        public static List<Name> NameTitle => new List<Name>
        {
            new Name
            {
                Id = 1,
                Title = "Salon Beauty"
            }
        };
    }
}
