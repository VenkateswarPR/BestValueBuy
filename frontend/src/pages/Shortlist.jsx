import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  MapPin,
  Trash2,
  Eye,
  Building2
} from 'lucide-react';

import { properties, money } from '../data/properties';


const SHORTLIST_KEY =
  'bestValueBuyShortlist';


export default function Shortlist() {

  const [shortlistedIds, setShortlistedIds] =
    useState([]);

  const [shortlistedProperties, setShortlistedProperties] =
    useState([]);


  /* =========================================================
     LOAD SHORTLIST
  ========================================================= */

  useEffect(() => {

    loadShortlist();

  }, []);


  const loadShortlist = () => {

    try {

      const saved =
        JSON.parse(
          localStorage.getItem(
            SHORTLIST_KEY
          ) || '[]'
        );


      const ids =
        Array.isArray(saved)
          ? saved
          : [];


      setShortlistedIds(ids);


      /*
       * Get demo properties
       */

      const demoProperties =
        properties.filter(
          (property) =>
            ids.includes(
              String(property.id)
            )
        );


      /*
       * Get user-posted properties
       */

      const userProperties =
        JSON.parse(
          localStorage.getItem(
            'bestValueBuyUserProperties'
          ) || '[]'
        );


      const userPropertyList =
        Array.isArray(userProperties)
          ? userProperties
          : [];


      const userShortlisted =
        userPropertyList.filter(
          (property) =>
            ids.includes(
              String(property.id)
            )
        );


      setShortlistedProperties([
        ...userShortlisted,
        ...demoProperties
      ]);

    } catch (error) {

      console.error(
        'Unable to load shortlist:',
        error
      );

      setShortlistedIds([]);

      setShortlistedProperties([]);

    }

  };


  /* =========================================================
     REMOVE FROM SHORTLIST
  ========================================================= */

  const removeFromShortlist = (id) => {

    const updatedIds =
      shortlistedIds.filter(
        (savedId) =>
          String(savedId) !==
          String(id)
      );


    localStorage.setItem(
      SHORTLIST_KEY,
      JSON.stringify(updatedIds)
    );


    setShortlistedIds(
      updatedIds
    );


    setShortlistedProperties(
      (previous) =>
        previous.filter(
          (property) =>
            String(property.id) !==
            String(id)
        )
    );

  };


  /* =========================================================
     PRICE
  ========================================================= */

  const getPrice = (property) => {

    const isRent =
      String(property.purpose || '')
        .toLowerCase() === 'rent';


    if (isRent) {

      return (
        <>
          ₹{Number(
            property.price || 0
          ).toLocaleString('en-IN')}

          <span className="shortlist-price-unit">
            / month
          </span>
        </>
      );

    }


    return money(
      Number(property.price || 0)
    );

  };


  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (shortlistedProperties.length === 0) {

    return (

      <main className="shortlist-page">

        <section className="shortlist-container">

          <div className="shortlist-header">

            <span className="shortlist-eyebrow">
              MY ACCOUNT
            </span>

            <h1>
              Shortlist
            </h1>

            <p>
              Properties you save will appear here.
            </p>

          </div>


          <div className="shortlist-empty">

            <div className="shortlist-empty-icon">

              <Heart size={34} />

            </div>


            <h2>
              Your shortlist is empty
            </h2>


            <p>
              Save properties you like and
              compare them later from one place.
            </p>


            <Link
              to="/properties"
              className="shortlist-browse-btn"
            >
              Browse Properties
            </Link>

          </div>

        </section>

      </main>

    );

  }


  /* =========================================================
     MAIN
  ========================================================= */

  return (

    <main className="shortlist-page">

      <section className="shortlist-container">


        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="shortlist-header">

          <span className="shortlist-eyebrow">
            MY ACCOUNT
          </span>

          <h1>
            Shortlist
          </h1>

          <p>
            Properties you have saved for later.
          </p>

        </div>


        {/* ===================================================
            COUNT
        =================================================== */}

        <div className="shortlist-count">

          <Heart size={17} />

          <span>
            {shortlistedProperties.length}{' '}
            {shortlistedProperties.length === 1
              ? 'property'
              : 'properties'}{' '}
            shortlisted
          </span>

        </div>


        {/* ===================================================
            PROPERTY GRID
        =================================================== */}

        <div className="shortlist-grid">

          {shortlistedProperties.map(
            (property) => {

              const isRent =
                String(property.purpose || '')
                  .toLowerCase() === 'rent';


              const image =
                property.image ||
                property.images?.[0];


              const propertyType =
                property.propertyType ||
                property.type ||
                'Property';


              const location =
                property.location ||
                [
                  property.locality,
                  property.city
                ]
                  .filter(Boolean)
                  .join(', ');


              return (

                <article
                  className="shortlist-card"
                  key={property.id}
                >


                  {/* IMAGE */}

                  <div className="shortlist-image">

                    {image ? (

                      <img
                        src={image}
                        alt={
                          property.title ||
                          propertyType
                        }
                      />

                    ) : (

                      <div className="shortlist-no-image">

                        <Building2 size={35} />

                      </div>

                    )}


                    <span
                      className={
                        `shortlist-purpose ${
                          isRent
                            ? 'rent'
                            : 'sale'
                        }`
                      }
                    >
                      {isRent
                        ? 'FOR RENT'
                        : 'FOR SALE'}
                    </span>


                    {/* REMOVE */}

                    <button
                      type="button"
                      className="shortlist-remove"
                      onClick={() =>
                        removeFromShortlist(
                          property.id
                        )
                      }
                      aria-label="Remove from shortlist"
                    >
                      <Heart
                        size={19}
                        fill="currentColor"
                      />
                    </button>

                  </div>


                  {/* CONTENT */}

                  <div className="shortlist-card-content">

                    <span className="shortlist-property-type">
                      {propertyType}
                    </span>


                    <h2>
                      {property.title ||
                        `${propertyType} in ${location}`}
                    </h2>


                    <div className="shortlist-location">

                      <MapPin size={15} />

                      <span>
                        {location ||
                          'Location not provided'}
                      </span>

                    </div>


                    <div className="shortlist-price">

                      {getPrice(property)}

                    </div>


                    <div className="shortlist-meta">

                      {property.area && (
                        <span>
                          {property.area} sq.ft
                        </span>
                      )}


                      {property.beds && (
                        <span>
                          {property.beds} BHK
                        </span>
                      )}


                      {property.baths && (
                        <span>
                          {property.baths} Bath
                        </span>
                      )}

                    </div>


                    {/* ACTIONS */}

                    <div className="shortlist-actions">

                      <Link
                        to={`/properties/${property.id}`}
                        className="shortlist-view-btn"
                      >

                        <Eye size={16} />

                        View Property

                      </Link>


                      <button
                        type="button"
                        className="shortlist-delete-btn"
                        onClick={() =>
                          removeFromShortlist(
                            property.id
                          )
                        }
                      >

                        <Trash2 size={16} />

                      </button>

                    </div>

                  </div>

                </article>

              );

            }
          )}

        </div>

      </section>

    </main>

  );

}