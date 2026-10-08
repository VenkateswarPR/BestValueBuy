import React, { useEffect, useMemo, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams
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

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();

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

  const price =
    Number(property.price || 0);

  const area =
    property.area ||
    property.builtUpArea ||
    property.plotArea ||
    '';

  const builtUpArea =
    property.builtUpArea ||
    '';

  const plotArea =
    property.plotArea ||
    '';

  const udsValue =
    property.udsValue ||
    '';

  const apartmentName =
    property.apartmentName ||
    '';

  const bedrooms =
    property.beds ||
    property.bedrooms ||
    '';

  const bathrooms =
    property.baths ||
    property.bathrooms ||
    '';

  const propertyAge =
    property.propertyAge ||
    '';

  const facing =
    property.facing ||
    '';

  const listedBy =
    property.listedBy ||
    'Owner';

  const location =
    property.location ||
    [
      property.locality,
      property.city
    ]
      .filter(Boolean)
      .join(', ');


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
        : `${propertyType} in ${location}`
    );


  /* =========================================================
     PROPERTY HIGHLIGHTS
  ========================================================= */

  const highlights = [];


  if (isApartment) {

    if (builtUpArea) {
      highlights.push({
        icon: <Ruler size={19} />,
        label: 'Built-up Area',
        value: `${Number(builtUpArea).toLocaleString('en-IN')} sq.ft`
      });
    }

    if (udsValue) {
      highlights.push({
        icon: <Building2 size={19} />,
        label: 'UDS Value',
        value: `${Number(udsValue).toLocaleString('en-IN')} sq.ft`
      });
    }

    if (bedrooms) {
      highlights.push({
        icon: <Home size={19} />,
        label: 'Bedrooms',
        value: `${bedrooms} BHK`
      });
    }

    if (bathrooms) {
      highlights.push({
        icon: <Home size={19} />,
        label: 'Bathrooms',
        value: bathrooms
      });
    }

    if (propertyAge) {
      highlights.push({
        icon: <Clock size={19} />,
        label: 'Property Age',
        value: propertyAge
      });
    }

    if (facing) {
      highlights.push({
        icon: <Compass size={19} />,
        label: 'Facing',
        value: facing
      });
    }

  } else if (isLand) {

    if (plotArea) {
      highlights.push({
        icon: <Ruler size={19} />,
        label: 'Plot Area',
        value: `${Number(plotArea).toLocaleString('en-IN')} sq.ft`
      });
    }

    if (facing) {
      highlights.push({
        icon: <Compass size={19} />,
        label: 'Facing',
        value: facing
      });
    }

  } else {

    if (builtUpArea) {
      highlights.push({
        icon: <Ruler size={19} />,
        label: 'Built-up Area',
        value: `${Number(builtUpArea).toLocaleString('en-IN')} sq.ft`
      });
    }

    if (plotArea) {
      highlights.push({
        icon: <Ruler size={19} />,
        label: 'Plot Area',
        value: `${Number(plotArea).toLocaleString('en-IN')} sq.ft`
      });
    }

    if (bedrooms) {
      highlights.push({
        icon: <Home size={19} />,
        label: 'Bedrooms',
        value: `${bedrooms} BHK`
      });
    }

    if (bathrooms) {
      highlights.push({
        icon: <Home size={19} />,
        label: 'Bathrooms',
        value: bathrooms
      });
    }

    if (propertyAge) {
      highlights.push({
        icon: <Clock size={19} />,
        label: 'Property Age',
        value: propertyAge
      });
    }

    if (facing) {
      highlights.push({
        icon: <Compass size={19} />,
        label: 'Facing',
        value: facing
      });
    }
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
            className="back-button"
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
                {location}
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


              {/* APARTMENT NAME */}

              {isApartment && apartmentName && (

                <div className="apartment-name-box">

                  <Building2 size={20} />

                  <div>

                    <span>
                      Apartment Name
                    </span>

                    <strong>
                      {apartmentName}
                    </strong>

                  </div>

                </div>

              )}


              <div className="property-overview-grid">


                {/* APARTMENT */}

                {isApartment && (
                  <>

                    {builtUpArea && (
                      <OverviewItem
                        icon={<Ruler size={20} />}
                        label="Built-up Area"
                        value={`${Number(builtUpArea).toLocaleString('en-IN')} sq.ft`}
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
                        label="Bedrooms"
                        value={`${bedrooms} BHK`}
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

                    <OverviewItem
                      icon={<User size={20} />}
                      label="Listed By"
                      value={listedBy}
                    />

                  </>
                )}


                {/* LAND */}

                {isLand && (
                  <>

                    {plotArea && (
                      <OverviewItem
                        icon={<Ruler size={20} />}
                        label="Plot Area"
                        value={`${Number(plotArea).toLocaleString('en-IN')} sq.ft`}
                      />
                    )}

                    {facing && (
                      <OverviewItem
                        icon={<Compass size={20} />}
                        label="Facing"
                        value={facing}
                      />
                    )}

                    <OverviewItem
                      icon={<User size={20} />}
                      label="Listed By"
                      value={listedBy}
                    />

                  </>
                )}


                {/* HOUSE / VILLA */}

                {!isApartment && !isLand && (
                  <>

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

                    {bedrooms && (
                      <OverviewItem
                        icon={<Home size={20} />}
                        label="Bedrooms"
                        value={`${bedrooms} BHK`}
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

                    <OverviewItem
                      icon={<User size={20} />}
                      label="Listed By"
                      value={listedBy}
                    />

                  </>
                )}

              </div>

            </section>


            {/* ===============================================
                AREA DETAILS
            =============================================== */}

            <section className="details-card">

              <div className="details-card-heading">

                <div>

                  <span className="details-eyebrow">
                    AREA DETAILS
                  </span>

                  <h2>
                    Property area
                  </h2>

                </div>

              </div>


              {isApartment && (

                <div className="area-detail-box">

                  <div className="area-detail-row">

                    <span>
                      Built-up Area
                    </span>

                    <strong>
                      {builtUpArea
                        ? `${Number(builtUpArea).toLocaleString('en-IN')} sq.ft`
                        : 'Not provided'}
                    </strong>

                  </div>


                  <div className="area-detail-row">

                    <span>
                      UDS Value
                    </span>

                    <strong>
                      {udsValue
                        ? `${Number(udsValue).toLocaleString('en-IN')} sq.ft`
                        : 'Not provided'}
                    </strong>

                  </div>


                  <p className="area-description">

                    Built-up Area represents the
                    constructed / covered area of
                    the apartment. UDS Value represents
                    the undivided share of land associated
                    with the apartment.

                  </p>

                </div>

              )}


              {(isHouse || isVilla) && (

                <div className="area-detail-box">

                  <div className="area-detail-row">

                    <span>
                      Built-up Area
                    </span>

                    <strong>
                      {builtUpArea
                        ? `${Number(builtUpArea).toLocaleString('en-IN')} sq.ft`
                        : 'Not provided'}
                    </strong>

                  </div>


                  <div className="area-detail-row">

                    <span>
                      Plot Area
                    </span>

                    <strong>
                      {plotArea
                        ? `${Number(plotArea).toLocaleString('en-IN')} sq.ft`
                        : 'Not provided'}
                    </strong>

                  </div>


                  <p className="area-description">

                    Built-up Area represents the
                    constructed / covered area of
                    the building, while Plot Area
                    represents the total land area
                    on which the property is situated.

                  </p>

                </div>

              )}


              {isLand && (

                <div className="area-detail-box">

                  <div className="area-detail-row">

                    <span>
                      Plot Area
                    </span>

                    <strong>
                      {plotArea
                        ? `${Number(plotArea).toLocaleString('en-IN')} sq.ft`
                        : 'Not provided'}
                    </strong>

                  </div>


                  <p className="area-description">

                    Plot Area represents the total
                    land area available for this
                    property.

                  </p>

                </div>

              )}

            </section>


            {/* ===============================================
                DESCRIPTION
            =============================================== */}

            {property.description && (

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
                  {property.description}
                </p>

              </section>

            )}


            {/* ===============================================
                HIGHLIGHTS
            =============================================== */}

            {highlights.length > 0 && (

              <section className="details-card">

                <div className="details-card-heading">

                  <div>

                    <span className="details-eyebrow">
                      KEY FEATURES
                    </span>

                    <h2>
                      Property highlights
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
                href="tel:+919999999999"
                className="contact-primary-btn"
              >

                <Phone size={17} />

                <span>
                  Contact Owner
                </span>

              </a>


              <a
                href="tel:+919999999999"
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
                onClick={() =>
                  alert(
                    'Property added to shortlist.'
                  )
                }
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