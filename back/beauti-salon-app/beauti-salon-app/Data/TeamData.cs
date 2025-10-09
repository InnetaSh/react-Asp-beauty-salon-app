using beauti_salon_app.Models;

namespace beauti_salon_app.Data
{
    public static class TeamData
    {
        public static List<TeamMember> Members => new List<TeamMember>
        {
            new TeamMember
            {
                Id = 1,
                ImageSrc = "/img/Team/sarah-jones.jpg",
                FullName = "Sarah Jones"
            },
            new TeamMember
            {
                Id = 2,
                ImageSrc = "/img/Team/james-norton.jpg",
                FullName = "James Norton"
            },
            new TeamMember
            {
                Id = 3,
                ImageSrc = "/img/Team/melissa-kim.jpg",
                FullName = "Melissa Kim"
            }
        };
    }
}
