import React, { useEffect, useMemo, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  MessageCircle,
  Calendar,
  ShieldCheck,
  Heart,
  Ruler,
  Home,
  Building2,
  User,
  Compass,
  Clock,
  IndianRupee
} from 'lucide-react';

import { properties, money } from '../data/properties';

// Display all dates in DD/MM/YYYY format without timezone shifts.
function formatDate(value) {
  if (!value) return '';

  const text = String(value).trim();
  if (!text) return '';

  // Preserve dates that are already in DD/MM/YYYY format.
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(text)) {
    return text;
  }

  // Parse date-only ISO strings manually to avoid UTC timezone shifts.
  const isoMatch = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    return `${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}`;
  }

  const date = new Date(text);
  if (Number.isNaN(date.getTime())) return text;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userProperties, setUserProperties] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

  /* =========================================================
     LOAD USER POSTED PROPERTIES
  ========================================================= */

  useEffect(() => {
    try {
      const savedProperties = JSON.parse(
        localStorage.getItem('bestValueBuyUserProperties') || '[]'
      );

      setUserProperties(
        Array.isArray(savedProperties)
          ? savedProperties
          : []
      );
    } catch (error) {
      console.error(
        'Unable to load user properties:',
        error
      );

      setUserProperties([]);
    }
  }, []);


  /* =========================================================
     FIND PROPERTY
  ========================================================= */

  const property = useMemo(() => {
    const userProperty = userProperties.find(
      (item) => String(item.id) === String(id)
    );

    if (userProperty) {
      return userProperty;
    }

    return properties.find(
      (item) => String(item.id) === String(id)
    );
  }, [id, userProperties]);


  /* =========================================================
     PROPERTY TYPE
  ========================================================= */

  const propertyType =
    property?.propertyType ||
    property?.type ||
    '';

  const isApartment =
    propertyType.toLowerCase() === 'apartment';

  const isLand =
    propertyType.toLowerCase() === 'land';

  const isHouse =
    propertyType.toLowerCase() ===
      'individual house';

  const isVilla =
    propertyType.toLowerCase() === 'villa';


  /* =========================================================
     RENT / SALE
  ========================================================= */

  const isRent =
    String(property?.purpose || '').toLowerCase() ===
    'rent';

  const backTo =
    isRent
      ? '/properties?listing=rent'
      : '/properties';


  /* =========================================================
     GALLERY
  ========================================================= */

  const galleryImages = useMemo(() => {
    if (!property) {
      return [];
    }

    if (
      Array.isArray(property.images) &&
      property.images.length > 0
    ) {
      return property.images;
    }

    if (property.image) {
      return [property.image];
    }

    return [];
  }, [property]);


  /* =========================================================
     IMAGE NAVIGATION
  ========================================================= */

  const showPreviousImage = () => {
    if (galleryImages.length <= 1) {
      return;
    }

    setActiveImage((current) =>
      current === 0
        ? galleryImages.length - 1
        : current - 1
    );
  };


  const showNextImage = () => {
    if (galleryImages.length <= 1) {
      return;
    }

    setActiveImage((current) =>
      current === galleryImages.length - 1
        ? 0
        : current + 1
    );
  };


  /* =========================================================
     PROPERTY NOT FOUND
  ========================================================= */

  if (!property) {
    return (
      <main className="property-not-found">

        <div className="property-not-found-inner">

          <h1>
            Property not found
          </h1>

          <p>
            The property you are looking for
            may have been removed or is no
            longer available.
          </p>

          <Link
            to={backTo}
            className="primary-btn"
          >
            Back to Properties
          </Link>

        </div>

      </main>
    );
  }


  /* =========================================================
     PROPERTY VALUES
  ========================================================= */

  const validNumber = (value) => {
    if (value === null || value === undefined || String(value).trim() === '') {
      return '';
    }

    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? number : '';
  };

  const price = Number(property.price || 0);
  const builtUpArea = validNumber(property.builtUpArea);
  const plotArea = validNumber(property.plotArea);
  const udsValue = validNumber(property.udsValue);
  const area = validNumber(property.area) || builtUpArea || plotArea;
  const apartmentName = property.apartmentName || '';
  const bedrooms = validNumber(property.beds || property.bedrooms);
  const bathrooms = validNumber(property.baths || property.bathrooms);
  const propertyAge = property.propertyAge || '';
  const facing = property.facing || '';
  const listedBy = property.listedBy || 'Owner';

  // Rental-specific fields saved by PostProperty.jsx.
  const propertyName = property.propertyName || '';
  const roomType = property.roomType || '';
  const sharingType = property.sharingType || '';
  const furnishedType = property.furnishedType || '';
  const foodAvailable = property.foodAvailable || '';
  const attachedBathroom = property.attachedBathroom || '';
  const genderPreference = property.genderPreference || '';
  const availableFrom = property.availableFrom || '';
  const currentOccupancy = validNumber(property.currentOccupancy);
  const totalCapacity = validNumber(property.totalCapacity);
  const propertyDescription = String(property.description || '').trim();

  const location =
    property.location ||
    [property.locality, property.city].filter(Boolean).join(', ');


  /* =========================================================
     PRICE DISPLAY
  ========================================================= */

  const formattedPrice =
    isRent
      ? `₹${price.toLocaleString('en-IN')}`
      : money(price);


  /* =========================================================
     TITLE
  ========================================================= */

  const displayTitle =
    property.title ||
    (
      isApartment && apartmentName
        ? `${apartmentName} - ${bedrooms || ''} BHK Apartment`
        : `${propertyType || 'Property'}${location ? ` in ${location}` : ''}`
    );


  /* =========================================================
     DISTINCTIVE HIGHLIGHTS
     Only show standout amenities here. Core specifications stay
     in Property Information / Property Area to avoid repetition.
  ========================================================= */

  const highlights = [];

  if (foodAvailable) {
    highlights.push({ icon: <Home size={19} />, label: 'Food', value: foodAvailable });
  }
  if (attachedBathroom) {
    highlights.push({ icon: <Home size={19} />, label: 'Bathroom', value: attachedBathroom });
  }
  if (furnishedType) {
    highlights.push({ icon: <Building2 size={19} />, label: 'Furnishing', value: furnishedType });
  }
  if (genderPreference) {
    highlights.push({ icon: <User size={19} />, label: 'Suitable for', value: genderPreference });
  }
  if (property.amenities && Array.isArray(property.amenities)) {
    property.amenities.filter(Boolean).forEach((amenity) => {
      highlights.push({ icon: <ShieldCheck size={19} />, label: 'Amenity', value: amenity });
    });
  }


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="property-details-page">

      <div className="property-details-container">

        {/* ===================================================
            TOP BAR
        =================================================== */}

        <div className="property-details-topbar">

          <button
            type="button"
            className="back-button back-to-properties"
            onClick={() => navigate(backTo)}
          >
            <ArrowLeft size={17} />

            <span>
              Back to Properties
            </span>
          </button>

        </div>


        {/* ===================================================
            PROPERTY HEADER
        =================================================== */}

        <section className="property-details-heading">

          <div>

            <div className="property-badges">

              <span
                className={
                  isRent
                    ? 'property-purpose rent'
                    : 'property-purpose sale'
                }
              >
                {isRent
                  ? 'FOR RENT'
                  : 'FOR SALE'}
              </span>

              {property.verified && (
                <span className="verified-badge">
                  <ShieldCheck size={14} />
                  Verified
                </span>
              )}

              {property.isUserPosted && (
                <span className="new-property-badge">
                  New Listing
                </span>
              )}

            </div>


            <h1>
              {displayTitle}
            </h1>


            <div className="property-location">

              <MapPin size={17} />

              <span>
                {location || 'Location not provided'}
              </span>

            </div>

          </div>


          <div className="property-price-block">

            <strong>
              {formattedPrice}
            </strong>

            {isRent && (
              <span>
                / month
              </span>
            )}

          </div>

        </section>


        {/* ===================================================
            GALLERY
        =================================================== */}

        <section className="property-gallery">

          {galleryImages.length > 0 ? (

            <>
              <div className="gallery-main">

                <img
                  src={galleryImages[activeImage]}
                  alt={`${displayTitle} ${activeImage + 1}`}
                />


                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="gallery-arrow gallery-arrow-left"
                      onClick={showPreviousImage}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={22} />
                    </button>

                    <button
                      type="button"
                      className="gallery-arrow gallery-arrow-right"
                      onClick={showNextImage}
                      aria-label="Next image"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}


                <div className="gallery-counter">

                  {activeImage + 1}
                  {' / '}
                  {galleryImages.length}

                </div>

              </div>


              {galleryImages.length > 1 && (

                <div className="gallery-thumbnails">

                  {galleryImages.map(
                    (image, index) => (

                      <button
                        type="button"
                        key={`${image}-${index}`}
                        className={
                          `gallery-thumbnail ${
                            activeImage === index
                              ? 'active'
                              : ''
                          }`
                        }
                        onClick={() =>
                          setActiveImage(index)
                        }
                      >

                        <img
                          src={image}
                          alt={`Property ${index + 1}`}
                        />

                        {index === 0 && (
                          <span>
                            Cover
                          </span>
                        )}

                      </button>

                    )
                  )}

                </div>

              )}

            </>

          ) : (

            <div className="gallery-empty">

              <Home size={42} />

              <p>
                No property photos available
              </p>

            </div>

          )}

        </section>


        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <div className="property-details-layout">


          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="property-details-main">


            {/* ===============================================
                PROPERTY OVERVIEW
            =============================================== */}

            <section className="details-card">

              <div className="details-card-heading">

                <div>

                  <span className="details-eyebrow">
                    PROPERTY OVERVIEW
                  </span>

                  <h2>
                    Property information
                  </h2>

                </div>

              </div>


              <div className="property-overview-grid">
                <OverviewItem
                  icon={<Home size={20} />}
                  label="Property Type"
                  value={propertyType || 'Not specified'}
                />

                <OverviewItem
                  icon={<IndianRupee size={20} />}
                  label={isRent ? 'Monthly Rent' : 'Expected Price'}
                  value={formattedPrice + (isRent ? ' / month' : '')}
                />

                {location && (
                  <OverviewItem
                    icon={<MapPin size={20} />}
                    label="Location"
                    value={location}
                  />
                )}

                {isApartment && apartmentName && (
                  <OverviewItem
                    icon={<Building2 size={20} />}
                    label="Apartment Name"
                    value={apartmentName}
                  />
                )}

                {builtUpArea && (
                  <OverviewItem
                    icon={<Ruler size={20} />}
                    label="Built-up Area"
                    value={`${Number(builtUpArea).toLocaleString('en-IN')} sq.ft`}
                  />
                )}

                {plotArea && (
                  <OverviewItem
                    icon={<Ruler size={20} />}
                    label="Plot Area"
                    value={`${Number(plotArea).toLocaleString('en-IN')} sq.ft`}
                  />
                )}

                {udsValue && (
                  <OverviewItem
                    icon={<Building2 size={20} />}
                    label="UDS Value"
                    value={`${Number(udsValue).toLocaleString('en-IN')} sq.ft`}
                  />
                )}

                {bedrooms && (
                  <OverviewItem
                    icon={<Home size={20} />}
                    label={propertyType.toLowerCase().includes('pg') || propertyType.toLowerCase().includes('hostel') ? 'Rooms / Bedrooms' : 'Bedrooms'}
                    value={`${bedrooms}${isApartment || isHouse || isVilla ? ' BHK' : ''}`}
                  />
                )}

                {bathrooms && (
                  <OverviewItem
                    icon={<Home size={20} />}
                    label="Bathrooms"
                    value={bathrooms}
                  />
                )}

                {propertyAge && (
                  <OverviewItem
                    icon={<Clock size={20} />}
                    label="Property Age"
                    value={propertyAge}
                  />
                )}

                {facing && (
                  <OverviewItem
                    icon={<Compass size={20} />}
                    label="Facing"
                    value={facing}
                  />
                )}

                {propertyName && (
                  <OverviewItem
                    icon={<Building2 size={20} />}
                    label="PG / Hostel Name"
                    value={propertyName}
                  />
                )}

                {roomType && (
                  <OverviewItem icon={<Home size={20} />} label="Room Type" value={roomType} />
                )}

                {sharingType && (
                  <OverviewItem icon={<User size={20} />} label="Sharing Type" value={sharingType} />
                )}

                {currentOccupancy !== '' && (
                  <OverviewItem icon={<User size={20} />} label="Current Occupancy" value={currentOccupancy} />
                )}

                {totalCapacity !== '' && (
                  <OverviewItem icon={<User size={20} />} label="Total Capacity" value={totalCapacity} />
                )}

                {furnishedType && (
                  <OverviewItem icon={<Home size={20} />} label="Furnishing" value={furnishedType} />
                )}

                {foodAvailable && (
                  <OverviewItem icon={<Home size={20} />} label="Food Available" value={foodAvailable} />
                )}

                {attachedBathroom && (
                  <OverviewItem icon={<Home size={20} />} label="Attached Bathroom" value={attachedBathroom} />
                )}

                {genderPreference && (
                  <OverviewItem icon={<User size={20} />} label="Gender Preference" value={genderPreference} />
                )}

                {availableFrom && (
                  <OverviewItem icon={<Calendar size={20} />} label="Available From" value={formatDate(availableFrom)} />
                )}

                <OverviewItem
                  icon={<User size={20} />}
                  label="Listed By"
                  value={listedBy}
                />
              </div>

            </section>


            {/* ===============================================
                AREA DETAILS
            =============================================== */}

            {(builtUpArea || plotArea || udsValue || area || isApartment || isHouse || isVilla || isLand) && (
              <section className="details-card">
                <div className="details-card-heading">
                  <div>
                    <span className="details-eyebrow">AREA DETAILS</span>
                    <h2>Property area</h2>
                  </div>
                </div>

                <div className="area-detail-box">
                  {builtUpArea && (
                    <div className="area-detail-row">
                      <span>Built-up Area</span>
                      <strong>{Number(builtUpArea).toLocaleString('en-IN')} sq.ft</strong>
                    </div>
                  )}

                  {plotArea && (
                    <div className="area-detail-row">
                      <span>Plot Area</span>
                      <strong>{Number(plotArea).toLocaleString('en-IN')} sq.ft</strong>
                    </div>
                  )}

                  {udsValue && (
                    <div className="area-detail-row">
                      <span>UDS Value</span>
                      <strong>{Number(udsValue).toLocaleString('en-IN')} sq.ft</strong>
                    </div>
                  )}

                  {!builtUpArea && !plotArea && !udsValue && area && (
                    <div className="area-detail-row">
                      <span>{isLand ? 'Plot Area' : 'Property Area'}</span>
                      <strong>{Number(area).toLocaleString('en-IN')} sq.ft</strong>
                    </div>
                  )}

                  {!builtUpArea && !plotArea && !udsValue && !area && (
                    <p className="area-description">Area details have not been provided for this property.</p>
                  )}

                  {(isApartment || isHouse || isVilla) && (
                    <p className="area-description">
                      Built-up Area is the constructed or covered area. Plot Area is the total land area on which the property is situated. UDS Value is the undivided share of land associated with an apartment.
                    </p>
                  )}
                </div>
              </section>
            )}


            {/* ===============================================
                DESCRIPTION
            =============================================== */}

            <section className="details-card">

                <div className="details-card-heading">

                  <div>

                    <span className="details-eyebrow">
                      DESCRIPTION
                    </span>

                    <h2>
                      About this property
                    </h2>

                  </div>

                </div>


                <p className="property-description">
                  {propertyDescription || 'No description has been provided for this property.'}
                </p>

              </section>


            {/* ===============================================
                HIGHLIGHTS
            =============================================== */}

            {highlights.length > 0 && (

              <section className="details-card">

                <div className="details-card-heading">

                  <div>

                    <span className="details-eyebrow">
                      WHAT MAKES IT SPECIAL
                    </span>

                    <h2>
                      Highlights & amenities
                    </h2>

                  </div>

                </div>


                <div className="property-highlights">

                  {highlights.map(
                    (item, index) => (

                      <div
                        className="highlight-item"
                        key={`${item.label}-${index}`}
                      >

                        <div className="highlight-icon">
                          {item.icon}
                        </div>

                        <div>

                          <span>
                            {item.label}
                          </span>

                          <strong>
                            {item.value}
                          </strong>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </section>

            )}

          </div>


          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <aside className="property-contact-column">

            <div className="contact-card">

              <div className="contact-card-header">

                <div className="contact-avatar">
                  <User size={22} />
                </div>

                <div>

                  <strong>
                    {listedBy}
                  </strong>

                  <span>
                    Property owner / seller
                  </span>

                </div>

              </div>


              <div className="contact-divider" />


              <a
                href={property.phone || property.contactPhone ? `tel:${property.phone || property.contactPhone}` : '#contact-owner'}
                onClick={(event) => {
                  if (!(property.phone || property.contactPhone)) {
                    event.preventDefault();
                    alert('Owner contact details have not been provided for this listing.');
                  }
                }}
                className="contact-primary-btn"
              >

                <Phone size={17} />

                <span>
                  Contact Owner
                </span>

              </a>


              <a
                href={property.phone || property.contactPhone ? `tel:${property.phone || property.contactPhone}` : '#enquiry'}
                onClick={(event) => {
                  if (!(property.phone || property.contactPhone)) {
                    event.preventDefault();
                    alert('Owner contact details will be available when this feature is connected.');
                  }
                }}
                className="contact-secondary-btn"
              >

                <MessageCircle size={17} />

                <span>
                  Send Enquiry
                </span>

              </a>


              <button
                type="button"
                className="contact-secondary-btn"
                onClick={() =>
                  alert(
                    'Schedule visit feature coming soon.'
                  )
                }
              >

                <Calendar size={17} />

                <span>
                  Schedule Visit
                </span>

              </button>


              <button
                type="button"
                className="contact-secondary-btn"
                onClick={() => {
                  try {
                    const key = 'bestValueBuyShortlist';
                    const saved = JSON.parse(localStorage.getItem(key) || '[]');
                    const ids = Array.isArray(saved) ? saved : [];
                    const alreadySaved = ids.some((item) => String(item?.id ?? item) === String(property.id));
                    if (!alreadySaved) {
                      ids.push(property);
                      localStorage.setItem(key, JSON.stringify(ids));
                    }
                    alert(alreadySaved ? 'This property is already in your shortlist.' : 'Property added to shortlist.');
                  } catch (error) {
                    console.error('Unable to update shortlist:', error);
                    alert('Unable to update shortlist. Please try again.');
                  }
                }}
              >

                <Heart size={17} />

                <span>
                  Shortlist Property
                </span>

              </button>


              <p className="contact-note">

                Your contact details are kept
                private and shared only with
                the property owner.

              </p>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}


/* =========================================================
   OVERVIEW ITEM
========================================================= */

function OverviewItem({
  icon,
  label,
  value
}) {
  return (
    <div className="overview-item">

      <div className="overview-item-icon">
        {icon}
      </div>

      <div>

        <span>
          {label}
        </span>

        <strong>
          {value}
        </strong>

      </div>

    </div>
  );
}