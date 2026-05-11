const useEvents = () => {
  const events = [
    {
      id: 1,
      title: "Brunch Sing Along",
      image_url: "/slide-1.jpg",
      location: "Carnivore Grounds",
      date: "Aug 1",
      day: "Sat",
      price: "KES 1,000",
      category: "Music 1",
      dateRange: "Sat, Aug 1, 2026",
      time: "12:00 PM - 10:00 PM",
      description:
        "Celebrate love and music at Brunch Sing Along. Enjoy live performances, curated brunch experiences, and an unforgettable Valentines vibe.",
    },
    {
      id: 2,
      title: "Shincity Showman",
      image_url: "/slide-2.jpeg",
      location: "Ngong Racecourse",
      date: "Aug 8",
      day: "Sat",
      price: "KES 1,000",
      category: "Festival 1",

      dateRange: "Sat, Apr 4, 2026",
      time: "3:00 PM - 1:00 AM",
      description:
        "A high-energy outdoor festival featuring top DJs and live performers. Experience music, culture, and vibrant nightlife at its best.",
    },
    {
      id: 3,
      title: "Back To The Roots",
      image_url: "/slide-3.webp",
      location: "Naishola Gardens",
      date: "Aug 15",
      day: "Sat",
      price: "KES 500",
      category: "Cultural 1",

      dateRange: "Sat, Aug 1, 2026",
      time: "12:00 PM - 1:00 AM",
      description:
        "An immersive cultural music festival celebrating heritage, live bands, and authentic African sounds in a beautiful outdoor setting.",
    },
    {
      id: 4,
      title: "Canvas & Creativity",
      image_url: "/hero-3.png",
      location: "Nairobi Street Kitchen",
      date: "Aug 22",
      day: "Sat",
      price: "KES 500",
      category: "Art 3",

      dateRange: "Sat, Sep 5, 2026",
      time: "2:00 PM - 8:00 PM",
      description:
        "A vibrant art showcase featuring emerging and established creatives, live installations, and interactive exhibits in an inspiring open space.",
    },
    {
      id: 5,
      title: "Sip & Savor",
      image_url: "/hero-1.png",
      location: "K1 Klub House",
      date: "Aug 29",
      day: "Sat",
      price: "KES 500",
      category: "Food & Drink 5",

      dateRange: "Sat, Sep 19, 2026",
      time: "2:00 PM - 11:00 PM",
      description:
        "An indulgent evening of fine wine, curated food pairings, and great music, bringing together flavors and experiences in a relaxed social setting.",
    },
    {
      id: 6,
      title: "Connect & Create",
      image_url: "/hero-2.png",
      location: "iHub Nairobi",
      date: "Sep 4",
      day: "Sat",
      price: "KES 500",
      category: "Networking 2",

      dateRange: "Sat, Oct 3, 2026",
      time: "10:00 AM - 5:00 PM",
      description:
        "A dynamic networking experience bringing together creatives, founders, and professionals to share ideas, collaborate, and build meaningful connections.",
    },
    {
      id: 7,
      title: "Sip & Paint",
      image_url: "/hero-4.png",
      location: "Social House",
      date: "Sep 6",
      day: "Sat",
      price: "KES 1,000",
      category: "Experience 5",

      dateRange: "Sat, Oct 17, 2026",
      time: "3:00 PM - 9:00 PM",
      description:
        "A fun and relaxed creative session where painting meets good wine, music, and great company—perfect for unwinding and expressing your artistic side.",
    },
    {
      id: 8,
      title: "F1 Watch Party",
      image_url: "/f1_watch_party.jpeg",
      location: "Radisson Blu",
      date: "Sep 13",
      day: "Sun",
      price: "KES 500",
      category: "Sports 4",

      dateRange: "Sun, Nov 15, 2026",
      time: "4:00 PM - 10:00 PM",
      description:
        "Catch all the high-speed action at this F1 watch party with big screens, great food, and an electric crowd. Experience every lap, overtake, and finish surrounded by fellow motorsport fans.",
    },
    {
      id: 9,
      title: "Jazz Night Live",
      image_url:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/jazz-night-flyer-template-design-de270da6f93bb0d4cab657f9572a765f_screen.jpg?ts=1636991643",
      location: "Alliance Française",
      date: "Sept 18",
      day: "Fri",
      price: "KES 500",
      category: "Music 1",

      dateRange: "Fri, Jan 10, 2026",
      time: "07:00 PM - 11:00 PM",
      description:
        "An intimate live jazz experience featuring local and international artists. Enjoy smooth sounds, great ambiance, and curated performances.",
    },
    {
      id: 10,
      title: "Kunye",
      image_url:
        "https://egotickets-core-cdn.s3.eu-north-1.amazonaws.com/production/uploads/event/banner_photo/51436/mobile_33a7939eb00df892.jpg",
      location: "Nairobi Railways",
      date: "Sept 20",
      day: "Sat",
      price: "KES 1,000",
      category: "Music 1",

      dateRange: "Sat, Feb 01, 2026",
      time: "2:00 PM - 1:00 AM",
      description:
        "A guided sound healing experience combining music, meditation, and mindfulness to restore balance and clarity.",
    },
    {
      id: 11,
      title: "Startup Pitch Night",
      image_url:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
      location: "iHub Nairobi",
      date: "Sep 25",
      day: "Wed",
      price: "KES 500",
      category: "Business 2",

      dateRange: "Wed, Jan 15, 2026",
      time: "10:00 AM - 04:00 PM",
      description:
        "An evening for founders and innovators to pitch ideas, connect with investors, and network with the startup community.",
    },

    {
      id: 12,
      title: "Coastal Movie Night",
      image_url: "/msa cinema.jpg",
      location: "Nyali Cinemax",
      date: "Oct 2",
      day: "Wed",
      price: "KES 500",
      category: "Entertainment 3",

      dateRange: "Wed, Dec 17, 2025",
      time: "08:00 PM - 11:00 PM",
      description:
        "Enjoy classic and modern films in an open-air rooftop setting with breathtaking coastal views.",
    },
    {
      id: 13,
      title: "Mindfulness Retreat",
      image_url: "/mindfulness.jpeg",
      location: "Nairobi Arboretum",
      date: "Oct 10",
      day: "Sat",
      price: "KES 500",
      category: "Wellness 4",

      dateRange: "Sat, Jan 03 – Sun, Jan 04, 2026",
      time: "10:00 AM - 4:00 PM",
      description:
        "A peaceful weekend retreat focused on mindfulness, meditation, and relaxation in a serene natural setting.",
    },
    {
      id: 14,
      title: "How to Build a Library",
      image_url: "/library.jpeg",
      location: "KICC Grounds",
      date: "Oct 17",
      day: "Mon",
      price: "0",
      category: "Education 6",

      dateRange: "Mon, Dec 01, 2025",
      time: "10:00 AM - 02:00 PM",
      description:
        "A free educational workshop covering how to design, organize, and manage modern libraries for communities and institutions.",
    },
  ];

  return events;
};

export default useEvents;
