import React from 'react';
import {
  Link,
  useParams,
  useSearchParams
} from 'react-router-dom';

import {
  MapPin,
  Phone,
  MessageCircle,
  Calendar,
  Heart,
  ArrowLeft
} from 'lucide-react';

import {
  properties,
  money
} from '../data/properties';


export default function PropertyDetails() {

  const { id } = useParams();

  const [searchParams] = useSearchParams();

  /*
  =========================================================
  FIND PROPERTY
  =========================================================
  */

  const property =
    properties.find(
      (item) => item.id === id
    ) || properties[0];


  /*
  =========================================================
  SALE / RENT
  =========================================================
  */

  const isRent =
    property.purpose?.toLowerCase() === 'rent';


  /*
  =========================================================
  BACK URL
  =========================================================

  If the user came from Rent, take them back to Rent.

  Otherwise go to normal Buy properties.
  */

  const backTo =
    searchParams.get('listing') === 'rent' || isRent
      ? '/properties?listing=rent'
      : '/properties';


  /*
  =========================================================
  PRICE
  =========================================================
  */

  const formattedPrice =
    money(property.price);


  /*
  =========================================================
  PAGE
  =========================================================
  */

  return (

    <section className="wrap page">


      {/* =================================================
          BACK
      ================================================= */}

      <Link
        to={backTo}
        className="back"
      >
        <ArrowLeft size={17} />

        Back to properties
      </Link>


      {/* =================================================
          IMAGE
      ================================================= */}

      <div className="detail-gallery">

        <img
          src={property.image}
          alt={property.title}
        />

      </div>


      {/* =================================================
          MAIN DETAILS
      ================================================= */}

      <div className="detail-grid">


        {/* =================================================
            PROPERTY INFORMATION
        ================================================= */}

        <article>


          {/* =================================================
              TITLE
          ================================================= */}

          <div className="detail-title">

            <div>

              <span className="eyebrow">

                {property.type.toUpperCase()}

                {' • '}

                {isRent
                  ? 'FOR RENT'
                  : 'FOR SALE'}

              </span>


              <h1>
                {property.title}
              </h1>


              <p className="muted">

                <MapPin size={17} />

                {property.location}

              </p>

            </div>


            {/* FAVORITE */}

            <button
              type="button"
              className="heart"
              aria-label="Add property to shortlist"
            >
              <Heart />
            </button>

          </div>


          {/* =================================================
              PRICE
          ================================================= */}

          <div className="detail-price">

            {formattedPrice}

            {isRent ? (
              <small>
                / month
              </small>
            ) : (
              <small>
                Negotiable
              </small>
            )}

          </div>


          {/* =================================================
              PROPERTY SPECS
          ================================================= */}

          <div className="detail-specs">


            {/* AREA */}

            <div>

              <b>
                {property.area?.toLocaleString('en-IN')}
              </b>

              <span>
                sq.ft
              </span>

            </div>


            {/* BEDROOMS */}

            {property.beds > 0 && (

              <div>

                <b>
                  {property.beds}
                </b>

                <span>
                  Bedrooms
                </span>

              </div>

            )}


            {/* BATHROOMS */}

            {property.baths > 0 && (

              <div>

                <b>
                  {property.baths}
                </b>

                <span>
                  Bathrooms
                </span>

              </div>

            )}


            {/* LISTED BY */}

            <div>

              <b>
                {property.listedBy}
              </b>

              <span>
                Listed by
              </span>

            </div>

          </div>


          {/* =================================================
              ABOUT
          ================================================= */}

          <h2>
            About this property
          </h2>


          <p className="description">
            {property.description}
          </p>


          {/* =================================================
              PROPERTY HIGHLIGHTS
          ================================================= */}

          <h2>
            Property highlights
          </h2>


          <ul className="highlights">

            <li>
              Good location and connectivity
            </li>

            <li>
              Suitable for residential use
            </li>

            <li>
              Clear property information
            </li>

            <li>
              {isRent
                ? 'Suitable for rental living'
                : 'Suitable for purchase'}
            </li>

            <li>
              Contact seller directly through BestValueBuy
            </li>

          </ul>

        </article>


        {/* =================================================
            CONTACT CARD
        ================================================= */}

        <aside className="contact-card">


          {/* SELLER */}

          <div className="seller">

            <div className="avatar">
              {property.listedBy?.[0]}
            </div>


            <div>

              <strong>
                {property.listedBy}
              </strong>

              <span>

                {property.verified
                  ? '✓ Verified listing'
                  : 'Property advertiser'}

              </span>

            </div>

          </div>


          {/* MESSAGE */}

          <p>

            Interested in this{' '}

            {isRent
              ? 'rental property'
              : 'property'}?

            {' '}

            Contact the advertiser to discuss{' '}

            {isRent
              ? 'rent and arrange a visit.'
              : 'price and arrange a visit.'}

          </p>


          {/* CONTACT */}

          <Link
            className="primary full"
            to="/login"
          >

            <Phone size={18} />

            Contact {property.listedBy}

          </Link>


          {/* ENQUIRY */}

          <button
            type="button"
            className="secondary full"
          >

            <MessageCircle size={18} />

            Send enquiry

          </button>


          {/* VISIT */}

          <button
            type="button"
            className="secondary full"
          >

            <Calendar size={18} />

            Schedule a visit

          </button>


          {/* PRIVACY */}

          <small className="privacy-note">

            Your contact details are shared only
            when you choose to connect.

          </small>

        </aside>

      </div>

    </section>

  );
}