
const properties = [
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
    builtUpArea: 1150,
    plotArea: 0,
    udsValue: 450,
    apartmentName: 'Premium Residential Apartments',
    beds: 2,
    baths: 2,
    propertyAge: '1–5 years',
    facing: 'East',
    listedBy: 'Owner',
    verified: true,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Premium 2 BHK apartment in Anna Nagar with excellent connectivity and modern amenities.',
  },

  {
    id: '2',
    title: 'Spacious 3 BHK Villa',
    type: 'Villa',
    purpose: 'Sale',
    price: 9250000,
    location: 'Poonamallee, Chennai',
    area: 1850,
    builtUpArea: 1850,
    plotArea: 2400,
    udsValue: 0,
    beds: 3,
    baths: 3,
    propertyAge: '1–5 years',
    facing: 'North',
    listedBy: 'Owner',
    verified: true,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Spacious 3 BHK villa with generous living space, parking and peaceful surroundings.',
  },

  {
    id: '3',
    title: 'CMDA Approved Residential Plot',
    type: 'Land',
    purpose: 'Sale',
    price: 3500000,
    location: 'Poonamallee, Chennai',
    area: 1200,
    builtUpArea: 0,
    plotArea: 1200,
    udsValue: 0,
    beds: 0,
    baths: 0,
    propertyAge: '',
    facing: 'East',
    listedBy: 'Owner',
    verified: true,
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Sample residential plot listing. Approval status must be verified before publication.',
  },

  {
    id: '4',
    title: 'Modern 3 BHK Individual House',
    type: 'Individual House',
    purpose: 'Sale',
    price: 7900000,
    location: 'Avadi, Chennai',
    area: 1650,
    builtUpArea: 1650,
    plotArea: 1800,
    udsValue: 0,
    beds: 3,
    baths: 3,
    propertyAge: '5–10 years',
    facing: 'South',
    listedBy: 'Owner',
    verified: true,
    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Sample individual house listing with spacious rooms, parking and convenient road access.',
  },

  {
    id: '5',
    title: '2 BHK Ready-to-Move Apartment',
    type: 'Apartment',
    purpose: 'Sale',
    price: 5400000,
    location: 'Mogappair, Chennai',
    area: 1050,
    builtUpArea: 1050,
    plotArea: 0,
    udsValue: 400,
    apartmentName: 'Mogappair Residential Apartments',
    beds: 2,
    baths: 2,
    propertyAge: '1–5 years',
    facing: 'West',
    listedBy: 'Owner',
    verified: true,
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Sample 2 BHK apartment listing in a well-connected residential neighbourhood.',
  },

  {
    id: '6',
    title: 'Commercial Land Near Main Road',
    type: 'Land',
    purpose: 'Sale',
    price: 12000000,
    location: 'OMR, Chennai',
    area: 2400,
    builtUpArea: 0,
    plotArea: 2400,
    udsValue: 0,
    beds: 0,
    baths: 0,
    propertyAge: '',
    facing: 'North',
    listedBy: 'Owner',
    verified: true,
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Sample commercial land listing. Zoning, permitted use and approvals require verification.',
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
    builtUpArea: 1150,
    plotArea: 0,
    udsValue: 450,
    apartmentName: 'Anna Nagar Residential Apartments',
    beds: 2,
    baths: 2,
    propertyAge: '1–5 years',
    facing: 'East',
    listedBy: 'Owner',
    verified: true,
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Sample furnished 2 BHK apartment available for monthly rent in Anna Nagar.',
  },

  {
    id: 'r2',
    title: 'Spacious 3 BHK Family Villa',
    type: 'Villa',
    purpose: 'Rent',
    price: 45000,
    location: 'Poonamallee, Chennai',
    area: 1850,
    builtUpArea: 1850,
    plotArea: 2400,
    udsValue: 0,
    beds: 3,
    baths: 3,
    propertyAge: '1–5 years',
    facing: 'North',
    listedBy: 'Owner',
    verified: true,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Sample family villa rental with parking and a peaceful residential environment.',
  },

  {
    id: 'r3',
    title: 'Modern 2 BHK Apartment for Rent',
    type: 'Apartment',
    purpose: 'Rent',
    price: 22000,
    location: 'Porur, Chennai',
    area: 1080,
    builtUpArea: 1080,
    plotArea: 0,
    udsValue: 420,
    apartmentName: 'Porur Residential Apartments',
    beds: 2,
    baths: 2,
    propertyAge: '5–10 years',
    facing: 'South',
    listedBy: 'Owner',
    verified: true,
    image:
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Sample apartment rental in Porur with access to major roads and nearby employment centres.',
  },

  {
    id: 'r4',
    title: '3 BHK Individual House for Rent',
    type: 'Individual House',
    purpose: 'Rent',
    price: 32000,
    location: 'Avadi, Chennai',
    area: 1650,
    builtUpArea: 1650,
    plotArea: 1800,
    udsValue: 0,
    beds: 3,
    baths: 3,
    propertyAge: '5–10 years',
    facing: 'South',
    listedBy: 'Owner',
    verified: true,
    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Sample independent house rental with parking and spacious interiors.',
  },

  {
    id: 'r5',
    title: 'Compact 1 BHK Apartment',
    type: 'Apartment',
    purpose: 'Rent',
    price: 16000,
    location: 'Mogappair, Chennai',
    area: 650,
    builtUpArea: 650,
    plotArea: 0,
    udsValue: 250,
    apartmentName: 'Mogappair Residential Apartments',
    beds: 1,
    baths: 1,
    propertyAge: '5–10 years',
    facing: 'West',
    listedBy: 'Owner',
    verified: true,
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Sample compact 1 BHK apartment rental suitable for working professionals or couples.',
  },

  {
    id: 'r6',
    title: 'Premium 3 BHK Apartment',
    type: 'Apartment',
    purpose: 'Rent',
    price: 38000,
    location: 'OMR, Chennai',
    area: 1550,
    builtUpArea: 1550,
    plotArea: 0,
    udsValue: 500,
    apartmentName: 'OMR Residential Apartments',
    beds: 3,
    baths: 3,
    propertyAge: '1–5 years',
    facing: 'East',
    listedBy: 'Owner',
    verified: true,
    image:
      'https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Sample premium 3 BHK apartment rental with modern interiors and access to the OMR corridor.',
  },
];

export { properties };

export const money = (number) =>
  `₹${new Intl.NumberFormat('en-IN').format(number)}`;
