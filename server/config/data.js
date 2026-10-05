const places = [
  // =========================================================
  // WAIKIKI
  // =========================================================

  {
    title: "Waikīkī Sunset Yoga",
    description:
      "Join a relaxing outdoor yoga session near Waikīkī Beach while enjoying the sunset and ocean views. All experience levels are welcome.",
    location: "Waikiki",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Waikiki+Beach+Honolulu+HI",
    address: "Waikīkī Beach, Honolulu, HI 96815",
    category: "Wellness",
    event_date: "2026-10-10 17:30:00",
    end_date: "2026-10-10 18:45:00",
    organizer: "Oʻahu Wellness Collective",
    organizer_description:
      "A local wellness community that organizes outdoor yoga, meditation, and fitness activities around Oʻahu.",
    image_url:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    price: "Free",
    capacity: 30,
    tags: ["yoga", "sunset", "outdoors", "beginner-friendly"],
    website_url: "https://www.gohawaii.com/islands/oahu",
  },

  {
    title: "Waikīkī Surf Meetup",
    description:
      "Meet other local surfers for a casual morning surf session in Waikīkī. Participants should bring their own board or arrange a rental nearby.",
    location: "Waikiki",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Waikiki+Beach+Honolulu+HI",
    address: "Waikīkī Beach, Honolulu, HI 96815",
    category: "Sports",
    event_date: "2026-10-18 07:00:00",
    end_date: "2026-10-18 10:00:00",
    organizer: "Waikīkī Surf Community",
    organizer_description:
      "A community group connecting local surfers and visitors through casual surf meetups.",
    image_url:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f",
    price: "Free",
    capacity: 20,
    tags: ["surfing", "ocean", "sports", "morning"],
    website_url: "https://www.gohawaii.com/islands/oahu",
  },

  {
    title: "Waikīkī Beach Photography Walk",
    description:
      "Explore Waikīkī during golden hour and practice beach, architecture, and street photography with other local photographers.",
    location: "Waikiki",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Waikiki+Beach+Honolulu+HI",
    address: "Waikīkī Beach, Honolulu, HI 96815",
    category: "Photography",
    event_date: "2026-10-24 16:30:00",
    end_date: "2026-10-24 19:00:00",
    organizer: "Oʻahu Photo Walks",
    organizer_description:
      "A photography community that organizes casual photo walks and creative meetups around the island.",
    image_url:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    price: "Free",
    capacity: 15,
    tags: ["photography", "sunset", "walking", "creative"],
    website_url: "https://www.gohawaii.com/islands/oahu",
  },

  // =========================================================
  // KAKAʻAKO
  // =========================================================

  {
    title: "Kakaʻako Makers Market",
    description:
      "Browse handmade art, jewelry, clothing, food, and locally designed products from Oʻahu creators.",
    location: "Kakaako",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Kakaako+Waterfront+Park+Honolulu+HI",
    address: "102 Ohe St, Honolulu, HI 96813",
    category: "Arts",
    event_date: "2026-10-11 10:00:00",
    end_date: "2026-10-11 15:00:00",
    organizer: "Honolulu Makers Collective",
    organizer_description:
      "A local creative community supporting independent artists, designers, makers, and small businesses.",
    image_url:
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d",
    price: "Free",
    capacity: 200,
    tags: ["makers", "local-business", "shopping", "art"],
    website_url: "https://www.honolulu.gov/",
  },

  {
    title: "Kakaʻako Waterfront Cleanup",
    description:
      "Help keep the Kakaʻako coastline clean during a community volunteer morning. Gloves and basic cleanup supplies will be provided.",
    location: "Kakaako",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Kakaako+Waterfront+Park+Honolulu+HI",
    address: "102 Ohe St, Honolulu, HI 96813",
    category: "Environment",
    event_date: "2026-10-17 08:00:00",
    end_date: "2026-10-17 11:00:00",
    organizer: "Oʻahu Coastal Care",
    organizer_description:
      "A volunteer organization focused on coastal stewardship and environmental education.",
    image_url:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6",
    price: "Free",
    capacity: 50,
    tags: ["cleanup", "environment", "volunteer", "ocean"],
    website_url: "https://www.honolulu.gov/",
  },

  {
    title: "Kakaʻako Sunset Art Walk",
    description:
      "Take an evening walk through Kakaʻako to explore public art, murals, and local creative spaces.",
    location: "Kakaako",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Kakaako+Honolulu+HI",
    address: "Kakaʻako, Honolulu, HI 96813",
    category: "Arts",
    event_date: "2026-09-20 17:00:00",
    end_date: "2026-09-20 19:30:00",
    organizer: "Honolulu Art Walks",
    organizer_description:
      "A community group organizing accessible art and photography walks around Honolulu.",
    image_url:
      "https://images.unsplash.com/photo-1549490349-8643362247b5",
    price: "Free",
    capacity: 25,
    tags: ["art", "murals", "photography", "walking"],
    website_url: "https://www.honolulu.gov/",
  },

  // =========================================================
  // MANOA
  // =========================================================

  {
    title: "Manoa Valley Hiking Meetup",
    description:
      "Join a local hiking group for a morning adventure through the lush Manoa area. Bring water, comfortable shoes, and sun protection.",
    location: "Manoa",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Manoa+Falls+Trail+Honolulu+HI",
    address: "Manoa Falls Trail, Honolulu, HI 96822",
    category: "Hiking",
    event_date: "2026-10-12 08:00:00",
    end_date: "2026-10-12 11:30:00",
    organizer: "Oʻahu Hiking Club",
    organizer_description:
      "A recreational hiking community organizing group hikes for different experience levels.",
    image_url:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    price: "Free",
    capacity: 20,
    tags: ["hiking", "nature", "outdoors", "beginner-friendly"],
    website_url: "https://dlnr.hawaii.gov/dsp/",
  },

  {
    title: "Native Plant Workshop",
    description:
      "Learn about native Hawaiian plants and their role in local ecosystems during an educational community workshop.",
    location: "Manoa",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Manoa+Honolulu+HI",
    address: "Manoa, Honolulu, HI 96822",
    category: "Environment",
    event_date: "2026-10-22 09:00:00",
    end_date: "2026-10-22 12:00:00",
    organizer: "Oʻahu Native Plant Society",
    organizer_description:
      "A community organization promoting education, conservation, and appreciation of native Hawaiian plants.",
    image_url:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e",
    price: "$10",
    capacity: 25,
    tags: ["plants", "native-hawaiian", "environment", "education"],
    website_url: "https://dlnr.hawaii.gov/",
  },

  // =========================================================
  // KAILUA
  // =========================================================

  {
    title: "Kailua Sunrise Paddle",
    description:
      "Start the morning with a casual paddle along the Kailua coastline. This meetup is designed for beginners and intermediate paddlers.",
    location: "Kailua",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Kailua+Beach+Park+Hawaii",
    address: "526 Kawailoa Rd, Kailua, HI 96734",
    category: "Sports",
    event_date: "2026-10-15 06:30:00",
    end_date: "2026-10-15 09:00:00",
    organizer: "Kailua Ocean Community",
    organizer_description:
      "A local outdoor community organizing ocean activities and recreational meetups.",
    image_url:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    price: "$15",
    capacity: 20,
    tags: ["paddleboarding", "ocean", "sunrise", "sports"],
    website_url: "https://www.honolulu.gov/",
  },

  {
    title: "Kailua Beach Community Picnic",
    description:
      "Meet local residents and families for a relaxed community picnic with games, food, and beach activities.",
    location: "Kailua",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Kailua+Beach+Park+Hawaii",
    address: "526 Kawailoa Rd, Kailua, HI 96734",
    category: "Community",
    event_date: "2026-10-25 11:00:00",
    end_date: "2026-10-25 15:00:00",
    organizer: "Kailua Community Network",
    organizer_description:
      "A neighborhood organization creating opportunities for residents to connect through community activities.",
    image_url:
      "https://images.unsplash.com/photo-1472162072942-cd5147eb3902",
    price: "Free",
    capacity: 75,
    tags: ["community", "family", "picnic", "beach"],
    website_url: "https://www.honolulu.gov/",
  },

  // =========================================================
  // LANIKAI
  // =========================================================

  {
    title: "Lanikai Sunrise Photography Meetup",
    description:
      "Meet other photographers before sunrise and capture the changing colors of the Windward Coast.",
    location: "Lanikai",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Lanikai+Beach+Hawaii",
    address: "Lanikai Beach, Kailua, HI 96734",
    category: "Photography",
    event_date: "2026-10-08 05:45:00",
    end_date: "2026-10-08 08:00:00",
    organizer: "Oʻahu Photo Walks",
    organizer_description:
      "A photography community organizing sunrise, sunset, and street photography meetups around Oʻahu.",
    image_url:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: "Free",
    capacity: 15,
    tags: ["photography", "sunrise", "beach", "creative"],
    website_url: "https://www.gohawaii.com/islands/oahu",
  },

  // =========================================================
  // WAIMEA BAY
  // =========================================================

  {
    title: "North Shore Beach Cleanup",
    description:
      "Volunteer with other community members to remove marine debris and litter from the North Shore coastline.",
    location: "Waimea Bay",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Waimea+Bay+Beach+Park+Hawaii",
    address: "61-031 Kamehameha Hwy, Haleiwa, HI 96712",
    category: "Environment",
    event_date: "2026-10-13 08:00:00",
    end_date: "2026-10-13 11:00:00",
    organizer: "North Shore Coastal Care",
    organizer_description:
      "A volunteer group supporting marine conservation and coastal stewardship on Oʻahu.",
    image_url:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5",
    price: "Free",
    capacity: 60,
    tags: ["cleanup", "environment", "volunteer", "north-shore"],
    website_url: "https://www.honolulu.gov/",
  },

  {
    title: "North Shore Surf Photography Workshop",
    description:
      "Learn techniques for photographing surfers, waves, and coastal landscapes with an experienced local photographer.",
    location: "Waimea Bay",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Waimea+Bay+Beach+Park+Hawaii",
    address: "61-031 Kamehameha Hwy, Haleiwa, HI 96712",
    category: "Photography",
    event_date: "2026-11-07 07:00:00",
    end_date: "2026-11-07 10:30:00",
    organizer: "North Shore Photo Collective",
    organizer_description:
      "A group of photographers interested in documenting Oʻahu's landscapes, people, and ocean culture.",
    image_url:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f",
    price: "$25",
    capacity: 12,
    tags: ["photography", "surfing", "north-shore", "workshop"],
    website_url: "https://www.gohawaii.com/islands/oahu",
  },

  // =========================================================
  // WAIMEA VALLEY
  // =========================================================

  {
    title: "Waimea Valley Nature Walk",
    description:
      "Explore the botanical gardens and cultural landscape of Waimea Valley with a small group interested in Hawaiian plants and history.",
    location: "Waimea Valley",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Waimea+Valley+Haleiwa+HI",
    address: "59-864 Kamehameha Hwy, Haleiwa, HI 96712",
    category: "Nature",
    event_date: "2026-10-19 09:00:00",
    end_date: "2026-10-19 12:00:00",
    organizer: "Oʻahu Nature Explorers",
    organizer_description:
      "A community group interested in exploring and learning about Oʻahu's natural and cultural environments.",
    image_url:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    price: "$10",
    capacity: 20,
    tags: ["nature", "plants", "culture", "walking"],
    website_url: "https://www.waimeavalley.net/",
  },

  // =========================================================
  // HANAUMA BAY
  // =========================================================

  {
    title: "Hanauma Bay Ocean Education Day",
    description:
      "Learn about coral reefs, marine life, and responsible ocean recreation during an educational community event.",
    location: "Hanauma Bay",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Hanauma+Bay+Nature+Preserve+Honolulu+HI",
    address: "100 Hanauma Bay Rd, Honolulu, HI 96825",
    category: "Environment",
    event_date: "2026-10-21 08:00:00",
    end_date: "2026-10-21 12:00:00",
    organizer: "Oʻahu Marine Education Project",
    organizer_description:
      "A community education group focused on marine conservation and responsible ocean recreation.",
    image_url:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    price: "Free",
    capacity: 40,
    tags: ["ocean", "marine-life", "conservation", "education"],
    website_url: "https://dlnr.hawaii.gov/dar/",
  },

  {
    title: "Hanauma Bay Snorkeling Meetup",
    description:
      "A small-group snorkeling meetup for people interested in exploring the protected marine environment of Hanauma Bay.",
    location: "Hanauma Bay",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Hanauma+Bay+Nature+Preserve+Honolulu+HI",
    address: "100 Hanauma Bay Rd, Honolulu, HI 96825",
    category: "Ocean",
    event_date: "2026-11-01 07:00:00",
    end_date: "2026-11-01 10:30:00",
    organizer: "Oʻahu Ocean Explorers",
    organizer_description:
      "A recreational ocean community focused on snorkeling, marine education, and responsible ocean activities.",
    image_url:
      "https://images.unsplash.com/photo-1546500840-ae38253aba9b",
    price: "$20",
    capacity: 15,
    tags: ["snorkeling", "ocean", "marine-life", "beginner-friendly"],
    website_url: "https://dlnr.hawaii.gov/dar/",
  },

  // =========================================================
  // KOKO HEAD
  // =========================================================

  {
    title: "Koko Head Sunrise Challenge",
    description:
      "Take on an early-morning group hike up the historic Koko Crater Railway Trail and watch the sunrise from the summit.",
    location: "Koko Head",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Koko+Head+District+Park+Honolulu+HI",
    address: "423 Kaumakani St, Honolulu, HI 96825",
    category: "Hiking",
    event_date: "2026-10-09 05:30:00",
    end_date: "2026-10-09 08:00:00",
    organizer: "Oʻahu Hiking Club",
    organizer_description:
      "A recreational hiking community organizing group hikes and outdoor challenges around Oʻahu.",
    image_url:
      "https://images.unsplash.com/photo-1551632811-561732d1e306",
    price: "Free",
    capacity: 20,
    tags: ["hiking", "sunrise", "fitness", "challenge"],
    website_url: "https://www.honolulu.gov/",
  },

  {
    title: "Koko Head Fitness Meetup",
    description:
      "A group fitness session using the Koko Crater Railway Trail as a challenging outdoor workout.",
    location: "Koko Head",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Koko+Head+District+Park+Honolulu+HI",
    address: "423 Kaumakani St, Honolulu, HI 96825",
    category: "Fitness",
    event_date: "2026-10-27 06:00:00",
    end_date: "2026-10-27 08:00:00",
    organizer: "Oʻahu Outdoor Fitness",
    organizer_description:
      "An outdoor fitness community organizing group workouts, hikes, and endurance challenges.",
    image_url:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
    price: "Free",
    capacity: 25,
    tags: ["fitness", "hiking", "workout", "outdoors"],
    website_url: "https://www.honolulu.gov/",
  },

  // =========================================================
  // DIAMOND HEAD
  // =========================================================

  {
    title: "Diamond Head Morning Hike",
    description:
      "Start the day with a group hike along the Diamond Head Summit Trail and enjoy panoramic views of Waikīkī and the Oʻahu coastline.",
    location: "Diamond Head",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Diamond+Head+State+Monument+Honolulu+HI",
    address: "Diamond Head Rd, Honolulu, HI 96816",
    category: "Hiking",
    event_date: "2026-10-14 07:00:00",
    end_date: "2026-10-14 09:30:00",
    organizer: "Oʻahu Hiking Club",
    organizer_description:
      "A recreational hiking community organizing group hikes for visitors and local residents.",
    image_url:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    price: "$5",
    capacity: 20,
    tags: ["hiking", "sunrise", "views", "outdoors"],
    website_url: "https://dlnr.hawaii.gov/dsp/parks/oahu/diamond-head-state-monument/",
  },

  {
    title: "Diamond Head History Walk",
    description:
      "Explore the geological and military history of Lēʻahi while walking around the Diamond Head area with a local history enthusiast.",
    location: "Diamond Head",
    google_map_url:
      "https://www.google.com/maps/search/?api=1&query=Diamond+Head+State+Monument+Honolulu+HI",
    address: "Diamond Head Rd, Honolulu, HI 96816",
    category: "History",
    event_date: "2026-09-15 09:00:00",
    end_date: "2026-09-15 11:30:00",
    organizer: "Honolulu History Walks",
    organizer_description:
      "A local educational group offering informal walking tours focused on Honolulu history and landmarks.",
    image_url:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
    price: "$10",
    capacity: 18,
    tags: ["history", "culture", "walking", "education"],
    website_url:
      "https://dlnr.hawaii.gov/dsp/parks/oahu/diamond-head-state-monument/",
  },
]

export default places;