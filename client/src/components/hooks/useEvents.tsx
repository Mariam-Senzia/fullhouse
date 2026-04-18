const useEvents = () => {
  const events = [
    {
      id: 1,
      title: "Brunch Sing Along",
      image_url: "/slide-1.jpg",
      location: "Carnivore Grounds",
      event_date: "Aug 1",
      day: "Sat",
      price: "KES 1,000",
      category: "Music",
      dateRange: "Sat, Feb 14, 2026",
      time: "12:00 PM - 10:00 AM",
      description:
        "Celebrate love and music at Brunch Sing Along. Enjoy live performances, curated brunch experiences, and an unforgettable Valentines vibe.",
    },
    {
      id: 2,
      title: "Shincity Showman",
      image_url: "/slide-2.jpeg",
      location: "Ngong Racecourse",
      date: "Apr 4",
      day: "Sat",
      price: "KES 2,500",
      category: "Festival",

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
      date: "Sept 9",
      day: "Sat",
      price: "KES 2,000",
      category: "Cultural",

      dateRange: "Sat, Aug 1, 2026",
      time: "12:00 PM - 1:00 AM",
      description:
        "An immersive cultural music festival celebrating heritage, live bands, and authentic African sounds in a beautiful outdoor setting.",
    },
    {
      id: 4,
      title: "Jazz Night Live",
      image_url:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/jazz-night-flyer-template-design-de270da6f93bb0d4cab657f9572a765f_screen.jpg?ts=1636991643",
      location: "Alliance Française",
      date: "Jan 10",
      day: "Fri",
      price: "KES 1,500",
      category: "Music",

      dateRange: "Fri, Jan 10, 2026",
      time: "07:00 PM - 11:00 PM",
      description:
        "An intimate live jazz experience featuring local and international artists. Enjoy smooth sounds, great ambiance, and curated performances.",
    },
    {
      id: 5,
      title: "Kunye",
      image_url:
        "https://egotickets-core-cdn.s3.eu-north-1.amazonaws.com/production/uploads/event/banner_photo/51436/mobile_33a7939eb00df892.jpg",
      location: "Nairobi",
      date: "Feb 01",
      day: "Sat",
      price: "KES 2,500",
      category: "Wellness",

      dateRange: "Sat, Feb 01, 2026",
      time: "06:00 PM - 09:00 PM",
      description:
        "A guided sound healing experience combining music, meditation, and mindfulness to restore balance and clarity.",
    },

    {
      id: 6,
      title: "Startup Pitch Night",
      image_url:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
      location: "iHub Nairobi",
      date: "Oct 30",
      day: "Wed",
      price: "KES 500",
      category: "Business",

      dateRange: "Wed, Jan 15, 2026",
      time: "05:30 PM - 09:00 PM",
      description:
        "An evening for founders and innovators to pitch ideas, connect with investors, and network with the startup community.",
    },

    {
      id: 7,
      title: "Mombasa Rooftop Cinema",
      image_url:
        "https://img.freepik.com/premium-psd/tropic-beach-party-event-flyer-design_802174-300.jpg",
      location: "City Mall Nyali",
      date: "Dec 17",
      day: "Wed",
      price: "KES 1,000",
      category: "Entertainment",

      dateRange: "Wed, Dec 17, 2025",
      time: "08:00 PM - 11:00 PM",
      description:
        "Enjoy classic and modern films in an open-air rooftop setting with breathtaking coastal views.",
    },

    {
      id: 8,
      title: "Mindfulness Retreat",
      image_url:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
      location: "Naivasha Lodge",
      date: "Jan 03",
      day: "Sat",
      price: "KES 8,500",
      category: "Wellness",

      dateRange: "Sat, Jan 03 – Sun, Jan 04, 2026",
      time: "All Day",
      description:
        "A peaceful weekend retreat focused on mindfulness, meditation, and relaxation in a serene natural setting.",
    },

    {
      id: 9,
      title: "How to Build a Library",
      image_url:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
      location: "KICC Grounds",
      date: "Dec 01",
      day: "Mon",
      price: "Free",
      category: "Education",

      dateRange: "Mon, Dec 01, 2025",
      time: "10:00 AM - 02:00 PM",
      description:
        "A free educational workshop covering how to design, organize, and manage modern libraries for communities and institutions.",
    },
    {
      id: 10,
      title: "Canvas & Creativity",
      image_url: "/hero-3.png",
      location: "The Alchemist",
      date: "Sep 5",
      day: "Sat",
      price: "KES 1,500",
      category: "Art",

      dateRange: "Sat, Sep 5, 2026",
      time: "2:00 PM - 8:00 PM",
      description:
        "A vibrant art showcase featuring emerging and established creatives, live installations, and interactive exhibits in an inspiring open space.",
    },
    {
      id: 11,
      title: "Sip & Savor",
      image_url: "/hero-1.png",
      location: "K1 Klub House",
      date: "Sep 19",
      day: "Sat",
      price: "KES 3,000",
      category: "Food & Drink",

      dateRange: "Sat, Sep 19, 2026",
      time: "4:00 PM - 11:00 PM",
      description:
        "An indulgent evening of fine wine, curated food pairings, and great music, bringing together flavors and experiences in a relaxed social setting.",
    },
    {
      id: 12,
      title: "Connect & Create",
      image_url: "/hero-2.png",
      location: "iHub Nairobi",
      date: "Oct 3",
      day: "Sat",
      price: "KES 1,000",
      category: "Networking",

      dateRange: "Sat, Oct 3, 2026",
      time: "10:00 AM - 5:00 PM",
      description:
        "A dynamic networking experience bringing together creatives, founders, and professionals to share ideas, collaborate, and build meaningful connections.",
    },
    {
      id: 13,
      title: "Sip & Paint",
      image_url: "/hero-4.png",
      location: "Social House",
      date: "Oct 17",
      day: "Sat",
      price: "KES 2,500",
      category: "Experience",

      dateRange: "Sat, Oct 17, 2026",
      time: "3:00 PM - 9:00 PM",
      description:
        "A fun and relaxed creative session where painting meets good wine, music, and great company—perfect for unwinding and expressing your artistic side.",
    },
    {
      id: 14,
      title: "F1 Watch Party",
      image_url: "/f1_watch_party.jpeg",
      location: "Radisson Blu",
      date: "Nov 15",
      day: "Sun",
      price: "KES 1,500",
      category: "Sports",

      dateRange: "Sun, Nov 15, 2026",
      time: "4:00 PM - 10:00 PM",
      description:
        "Catch all the high-speed action at this F1 watch party with big screens, great food, and an electric crowd. Experience every lap, overtake, and finish surrounded by fellow motorsport fans.",
    },
  ];

  return events;
};

export default useEvents;
