const propertyImages = [
  '/BestValueBuy/property-images/property-exterior.jpg',
  '/BestValueBuy/property-images/living-room.jpg',
  '/BestValueBuy/property-images/kitchen.jpg',
  '/BestValueBuy/property-images/bedroom.jpg',
  '/BestValueBuy/property-images/bathroom.jpg',
  '/BestValueBuy/property-images/balcony.jpg'
];

export const properties = [

  // =====================================================
  // SALE PROPERTIES
  // =====================================================

  {
    id: '1',
    title: 'Premium 2 BHK Apartment',
    type: 'Apartment',
    purpose: 'Sale',
    price: 6800000,
    location: 'Anna Nagar, Chennai',
    area: 1150,
    beds: 2,
    baths: 2,
    listedBy: 'Owner',
    verified: true,

    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',

    images: propertyImages,

    description:
      'Premium 2 BHK apartment located in Anna Nagar with excellent connectivity and modern amenities.',
  },

  {
    id: '2',
    title: 'Spacious 3 BHK Villa',
    type: 'Villa',
    purpose: 'Sale',
    price: 9250000,
    location: 'Poonamallee, Chennai',
    area: 1850,
    beds: 3,
    baths: 3,
    listedBy: 'Owner',
    verified: true,

    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',

    images: propertyImages,

    description:
      'Spacious 3 BHK villa with excellent living space, parking and peaceful surroundings.',
  },

  {
    id: '3',
    title: 'CMDA Approved Residential Plot',
    type: 'Land',
    purpose: 'Sale',
    price: 3500000,
    location: 'Poonamallee, Chennai',
    area: 1200,
    beds: 0,
    baths: 0,
    listedBy: 'Owner',
    verified: true,

    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',

    images: propertyImages,

    description:
      'CMDA approved residential plot suitable for constructing an independent house.',
  },

  {
    id: '4',
    title: 'Modern 3 BHK Individual House',
    type: 'Individual House',
    purpose: 'Sale',
    price: 7900000,
    location: 'Avadi, Chennai',
    area: 1650,
    beds: 3,
    baths: 3,
    listedBy: 'Owner',
    verified: true,

    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80',

    images: propertyImages,

    description:
      'Modern 3 BHK individual house with spacious rooms, parking and convenient access to major roads.',
  },

  {
    id: '5',
    title: '2 BHK Ready-to-Move Apartment',
    type: 'Apartment',
    purpose: 'Sale',
    price: 5400000,
    location: 'Mogappair, Chennai',
    area: 1050,
    beds: 2,
    baths: 2,
    listedBy: 'Owner',
    verified: true,

    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',

    images: propertyImages,

    description:
      'Ready-to-move 2 BHK apartment in a well-connected residential neighbourhood.',
  },

  {
    id: '6',
    title: 'Commercial Land Near Main Road',
    type: 'Land',
    purpose: 'Sale',
    price: 12000000,
    location: 'OMR, Chennai',
    area: 2400,
    beds: 0,
    baths: 0,
    listedBy: 'Owner',
    verified: true,

    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',

    images: propertyImages,

    description:
      'Commercial land with excellent main-road visibility and strong development potential.',
  },

  // =====================================================
  // RENT PROPERTIES
  // =====================================================

  {
    id: 'r1',
    title: 'Fully Furnished 2 BHK Apartment',
    type: 'Apartment',
    purpose: 'Rent',
    price: 28000,
    location: 'Anna Nagar, Chennai',
    area: 1150,
    beds: 2,
    baths: 2,
    listedBy: 'Owner',
    verified: true,

    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',

    images: propertyImages,

    description:
      'Fully furnished 2 BHK apartment available for rent in Anna Nagar.',
  },

  {
    id: 'r2',
    title: 'Spacious 3 BHK Family Villa',
    type: 'Villa',
    purpose: 'Rent',
    price: 45000,
    location: 'Poonamallee, Chennai',
    area: 1850,
    beds: 3,
    baths: 3,
    listedBy: 'Owner',
    verified: true,

    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',

    images: propertyImages,

    description:
      'Spacious 3 BHK villa suitable for families, with parking and a peaceful residential environment.',
  },

  {
    id: 'r3',
    title: 'Modern 2 BHK Apartment for Rent',
    type: 'Apartment',
    purpose: 'Rent',
    price: 22000,
    location: 'Porur, Chennai',
    area: 1080,
    beds: 2,
    baths: 2,
    listedBy: 'Owner',
    verified: true,

    image:
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=80',

    images: propertyImages,

    description:
      'Modern 2 BHK apartment in Porur with good connectivity to IT parks and major roads.',
  },

  {
    id: 'r4',
    title: '3 BHK Individual House for Rent',
    type: 'Individual House',
    purpose: 'Rent',
    price: 32000,
    location: 'Avadi, Chennai',
    area: 1650,
    beds: 3,
    baths: 3,
    listedBy: 'Owner',
    verified: true,

    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80',

    images: propertyImages,

    description:
      'Independent 3 BHK house available for rent with parking and spacious interiors.',
  },

  {
    id: 'r5',
    title: 'Compact 1 BHK Apartment',
    type: 'Apartment',
    purpose: 'Rent',
    price: 16000,
    location: 'Mogappair, Chennai',
    area: 650,
    beds: 1,
    baths: 1,
    listedBy: 'Owner',
    verified: true,

    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',

    images: propertyImages,

    description:
      'Compact and comfortable 1 BHK apartment suitable for working professionals or couples.',
  },

  {
    id: 'r6',
    title: 'Premium 3 BHK Apartment',
    type: 'Apartment',
    purpose: 'Rent',
    price: 38000,
    location: 'OMR, Chennai',
    area: 1550,
    beds: 3,
    baths: 3,
    listedBy: 'Owner',
    verified: true,

    image:
      'https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1000&q=80',

    images: propertyImages,

    description:
      'Premium 3 BHK apartment on OMR with modern interiors and excellent access to IT corridors.',
  }
];

export const money = (number) =>
  `₹${new Intl.NumberFormat('en-IN').format(number)}`;