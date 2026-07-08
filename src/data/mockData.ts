export interface ChurchEvent {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  category: 'Sunday Service' | 'Thursday Women\'s Meeting' | 'Friday Youth Fellowship' | 'Night Vigil' | 'Bible Study' | 'Conventions';
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string; // YYYY-MM-DD
  category: 'General' | 'Urgent' | 'Youth' | 'Choir' | 'Building Fund' | 'Women\'s Ministry';
  isPinned?: boolean;
  isNew?: boolean;
}

export interface ChurchSection {
  id: string;
  name: string;
  pastor: string;
  location: string;
  province: string;
  meetingTimes: string[];
  contact: string;
  memberCount: number;
}

export interface UniformItem {
  id: string;
  name: string;
  category: 'Men' | 'Women' | 'Youth' | 'Choir Robes' | 'Sunday School';
  description: string;
  price: string;
  sizes: string[];
  imageUrl: string;
}

export interface YouthEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO DateTime
  location: string;
}

// Generate events relative to July 2026
export const mockEvents: ChurchEvent[] = [
  {
    id: 'e1',
    title: 'Sunday Worship Service',
    description: 'Join us for our main Sunday worship, praise, and powerful word from the Pastor. Visitors are warmly welcome!',
    date: '2026-07-05',
    time: '09:00 AM - 01:00 PM',
    location: 'Bethesda Temple, Highfield, Harare',
    category: 'Sunday Service',
  },
  {
    id: 'e2',
    title: 'Mothers of Bethesda (Thursday Fellowship)',
    description: 'Weekly prayer and teaching session for the women\'s ministry, focused on family, community work, and spiritual growth.',
    date: '2026-07-09',
    time: '02:00 PM - 05:00 PM',
    location: 'Highfield Assembly & All Provincial Sections',
    category: 'Thursday Women\'s Meeting',
  },
  {
    id: 'e3',
    title: 'Youth Friday Night Fellowship',
    description: 'An interactive session of worship, testimony, discussion of contemporary youth issues, and prayer.',
    date: '2026-07-10',
    time: '06:00 PM - 08:30 PM',
    location: 'Bethesda Temple Hall, Harare',
    category: 'Friday Youth Fellowship',
  },
  {
    id: 'e4',
    title: 'All-Night Vigil (Gungano reMweya)',
    description: 'A powerful night of intercession, deliverance, and spiritual renewal for the entire assembly.',
    date: '2026-07-17',
    time: '09:00 PM - 05:00 AM',
    location: 'Chitungwiza Ground / Bethel Center',
    category: 'Night Vigil',
  },
  {
    id: 'e5',
    title: 'Midweek Bible Study',
    description: 'Delving deeper into the Apostolic doctrines and understanding scripture for daily living.',
    date: '2026-07-22',
    time: '05:30 PM - 07:00 PM',
    location: 'Online (Zoom) & Highfield Temple Basement',
    category: 'Bible Study',
  },
  {
    id: 'e6',
    title: 'Annual Bethesda Apostolic Youth Convention',
    description: 'The national gathering of all Bethesda youth from across Zimbabwe for spiritual enrichment, music, and leadership development.',
    date: '2026-07-24',
    time: '08:00 AM - 05:00 PM (Runs to July 26)',
    location: 'Bethesda Headquarters Camp, Marondera',
    category: 'Conventions',
  },
  {
    id: 'e7',
    title: 'Sunday Worship Service',
    description: 'Main Sunday celebration with special testimonies from the Youth Convention.',
    date: '2026-07-26',
    time: '09:00 AM - 01:00 PM',
    location: 'Bethesda Temple, Highfield, Harare',
    category: 'Sunday Service',
  },
  {
    id: 'e8',
    title: 'Building Fund Special Thanksgiving Service',
    description: 'Special service to thank God for the temple progress and collect contributions towards the Roofing Phase.',
    date: '2026-08-02',
    time: '09:00 AM - 01:30 PM',
    location: 'Bethesda Temple, Highfield, Harare',
    category: 'Sunday Service',
  }
];

export const mockNotices: Notice[] = [
  {
    id: 'n1',
    title: 'Urgent: Building Fund - Roofing Phase',
    content: 'We are appeal to all members, sections, and well-wishers to contribute towards the Roofing Phase of our Highfield Temple. Our target is $18,000 by mid-August. You can submit payments via Section Treasurers or directly to the church Ecocash Merchant/Bank Account.',
    date: '2026-07-02',
    category: 'Building Fund',
    isPinned: true,
    isNew: true,
  },
  {
    id: 'n2',
    title: 'Choir Auditions for National Convention',
    content: 'The Bethesda Praise Choir will host auditions for new vocalists in all categories (Soprano, Alto, Tenor, Bass) this Saturday at 1:00 PM. Registered members, please prepare a verse and chorus of your favorite hymn.',
    date: '2026-07-01',
    category: 'Choir',
    isNew: true,
  },
  {
    id: 'n3',
    title: 'Youth Camp Registration Open',
    content: 'Registration for the Marondera Annual Youth Convention is officially open. The fee is $15 per person, which covers transport, lodging, and meals. Deadline for payment is July 18.',
    date: '2026-06-28',
    category: 'Youth',
  },
  {
    id: 'n4',
    title: 'Mothers Handcraft Workshop',
    content: 'The Women\'s Ministry will host a handcraft and entrepreneurship session next Thursday morning. All mothers and young women are encouraged to attend to learn sewing and detergent-making skills.',
    date: '2026-06-25',
    category: 'Women\'s Ministry',
  },
  {
    id: 'n5',
    title: 'Deacons & Elders Strategy Meeting',
    content: 'A reminder that there is a brief administrative meeting for all local leaders, elders, and deacons this Sunday immediately after the main service in the vestry.',
    date: '2026-06-20',
    category: 'General',
  }
];

export const mockSections: ChurchSection[] = [
  {
    id: 's1',
    name: 'Harare Highfield (Headquarters)',
    pastor: 'Pastor T. Maposa',
    location: 'Stand 4322, Mainway Meadows Road, Highfield, Harare',
    province: 'Harare',
    meetingTimes: [
      'Sundays: 09:00 AM - 01:00 PM',
      'Thursdays (Women): 02:00 PM - 05:00 PM',
      'Fridays (Youth): 06:00 PM - 08:00 PM'
    ],
    contact: '+263 77 212 3456',
    memberCount: 450,
  },
  {
    id: 's2',
    name: 'Chitungwiza Unit L Assembly',
    pastor: 'Evangelist S. Chinyama',
    location: 'Unit L Shopping Centre Road, Chitungwiza',
    province: 'Harare',
    meetingTimes: [
      'Sundays: 09:30 AM - 01:30 PM',
      'Wednesdays (Prayer): 05:00 PM - 06:30 PM'
    ],
    contact: '+263 71 298 7654',
    memberCount: 220,
  },
  {
    id: 's3',
    name: 'Bulawayo Nkulumane Section',
    pastor: 'Pastor M. Ndlovu',
    location: 'Khami Road & Nkulumane Drive, Nkulumane, Bulawayo',
    province: 'Bulawayo',
    meetingTimes: [
      'Sundays: 09:00 AM - 01:00 PM',
      'Thursdays (Women): 02:00 PM - 05:00 PM'
    ],
    contact: '+263 78 311 2233',
    memberCount: 180,
  },
  {
    id: 's4',
    name: 'Gweru Mkoba Assembly',
    pastor: 'Elder R. Sibanda',
    location: 'Mkoba 6 Extension, Gweru',
    province: 'Midlands',
    meetingTimes: [
      'Sundays: 09:00 AM - 01:00 PM',
      'Tuesdays (Bible Study): 05:30 PM - 07:00 PM'
    ],
    contact: '+263 77 488 9900',
    memberCount: 120,
  },
  {
    id: 's5',
    name: 'Mutare Sakubva Section',
    pastor: 'Evangelist D. Nyoni',
    location: 'Sakubva Phase 2, Mutare',
    province: 'Manicaland',
    meetingTimes: [
      'Sundays: 09:30 AM - 01:30 PM',
      'Fridays (Youth): 05:30 PM - 07:30 PM'
    ],
    contact: '+263 73 344 5566',
    memberCount: 140,
  },
  {
    id: 's6',
    name: 'Masvingo Mucheke Section',
    pastor: 'Deacon J. Moyo (Overseeing)',
    location: 'Mucheke F, Masvingo',
    province: 'Masvingo',
    meetingTimes: [
      'Sundays: 09:00 AM - 01:00 PM'
    ],
    contact: '+263 77 566 7788',
    memberCount: 95,
  }
];

export const mockUniforms: UniformItem[] = [
  {
    id: 'u1',
    name: 'Women\'s Standard Bethesda Uniform',
    category: 'Women',
    description: 'The standard regal purple/red dress with elegant collar embroidery and belt, crafted from high-durability fabrics for service wear.',
    price: '$25.00',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imageUrl: '/images/women_gathering.jpg',
  },
  {
    id: 'u2',
    name: 'Men\'s Sacred Blazer',
    category: 'Men',
    description: 'Tailored suit blazer with subtle stitching accents on the collar and cuffs, featuring the official church crest badge.',
    price: '$45.00',
    sizes: ['38', '40', '42', '44', '46'],
    imageUrl: '/images/elders_seated.jpg',
  },
  {
    id: 'u3',
    name: 'National Choir Robe',
    category: 'Choir Robes',
    description: 'Flowing purple/red polyester robe designed for vocal comfort and visual coordination during choir presentations.',
    price: '$30.00',
    sizes: ['S', 'M', 'L', 'XL'],
    imageUrl: '/images/women_gathering.jpg',
  },
  {
    id: 'u4',
    name: 'Youth Fellowship Attire',
    category: 'Youth',
    description: 'Official wear for youth gatherings, conferences, and formal service representation.',
    price: '$15.00',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    imageUrl: '/images/congregation_hall.jpg',
  },
  {
    id: 'u5',
    name: 'Sunday School Girls Dress',
    category: 'Sunday School',
    description: 'Lightweight dress with matching collar embroidery for girls, designed for ease of movement and comfort.',
    price: '$12.00',
    sizes: ['Child S', 'Child M', 'Child L'],
    imageUrl: '/images/women_gathering.jpg',
  },
  {
    id: 'u6',
    name: 'Sunday School Boys Attire Set',
    category: 'Sunday School',
    description: 'Formal shorts, short-sleeve white shirt, and tie set for boys in the Sunday School program.',
    price: '$14.00',
    sizes: ['Child S', 'Child M', 'Child L'],
    imageUrl: '/images/elders_seated.jpg',
  }
];

export const mockYouthEvents: YouthEvent[] = [
  {
    id: 'y1',
    title: 'Bethesda National Youth Convention 2026',
    description: 'The pinnacle event of the youth calendar. Three days of spiritual revival, worship sessions, gospel choir contests, and life-coaching seminars.',
    date: '2026-07-24T08:00:00+02:00',
    location: 'Marondera Conference Camp, Marondera',
  },
  {
    id: 'y2',
    title: 'Youth Career & Entrepreneurship Seminar',
    description: 'Empowering our young members with career guidance, CV writing workshops, and training on local Zimbabwean business startup opportunities.',
    date: '2026-08-15T10:00:00+02:00',
    location: 'Highfield Assembly Hall, Harare',
  },
  {
    id: 'y3',
    title: 'Youth Charity & Community Outreach Day',
    description: 'Spreading the love of Christ by cleaning up public spaces in Highfield and donating essential goods to a local children\'s home.',
    date: '2026-09-05T08:30:00+02:00',
    location: 'Highfield Community & Highfield Assembly',
  }
];

// Carousel items for homepage
export const heroCarouselImages = [
  {
    id: 'h1',
    url: '/images/congregation_hall.jpg',
    caption: 'Gathered in Oneness and Faith',
    tagline: 'Bethesda Apostolic Church welcoming all seekers of truth.',
  },
  {
    id: 'h2',
    url: '/images/women_gathering.jpg',
    caption: 'Bethesda Praise Choir',
    tagline: 'Lifting voices to the heavens in unified worship.',
  },
  {
    id: 'h3',
    url: '/images/elders_seated.jpg',
    caption: 'Bethesda Council of Elders',
    tagline: 'Rooted in truth and guidance for the congregation.',
  },
  {
    id: 'h4',
    url: '/images/pastor_preaching_1.jpg',
    caption: 'Lively Spirit-Led Ministry',
    tagline: 'Proclaiming the apostolic word beyond borders.',
  }
];

export const templeBuildingPhases = [
  { id: 'bp1', name: 'Foundation', status: 'Completed' as const, progress: 100, dateCompleted: 'September 2024' },
  { id: 'bp2', name: 'Walls & Columns', status: 'Completed' as const, progress: 100, dateCompleted: 'April 2025' },
  { id: 'bp3', name: 'Roofing Structure', status: 'In Progress' as const, progress: 65, dateCompleted: 'Expected August 2026' },
  { id: 'bp4', name: 'Interior Plastering & Floor', status: 'Not Started' as const, progress: 0 },
  { id: 'bp5', name: 'Finishing & Glazing', status: 'Not Started' as const, progress: 0 },
];

export const templeGallery = [
  {
    id: 'tg1',
    title: 'Elders strategy gathering',
    description: 'Elders convening at the local assembly to oversee building projects.',
    imageUrl: '/images/elders_seated.jpg'
  },
  {
    id: 'tg2',
    title: 'Glendale Assembly gathering',
    description: 'Members gathering during Glendale services.',
    imageUrl: '/images/congregation_hall.jpg'
  },
  {
    id: 'tg3',
    title: 'Pastor preaching the gospel',
    description: 'Lively delivery of the word during worship moments.',
    imageUrl: '/images/pastor_preaching_2.jpg'
  },
  {
    id: 'tg4',
    title: 'Worship Beyond Walls',
    description: 'Bethesda members singing praises in the main assembly.',
    imageUrl: '/images/women_gathering.jpg'
  }
];
