import React, { useEffect, useMemo, useState } from 'react';
import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  Building2,
  Home,
  MapPin,
  Pencil,
  Trash2,
  Eye,
  Plus,
  IndianRupee,
  CheckCircle2,
  Tag,
  LayoutDashboard
} from 'lucide-react';


const STORAGE_KEY =
  'bestValueBuyUserProperties';


export default function Dashboard() {

  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  const [activeFilter, setActiveFilter] =
    useState('All');

  const [deleteId, setDeleteId] =
    useState(null);


  /* =========================================================
     LOAD USER PROPERTIES
  ========================================================= */

  useEffect(() => {

    loadProperties();

  }, []);


  const loadProperties = () => {

    try {

      const saved =
        JSON.parse(
          localStorage.getItem(STORAGE_KEY) || '[]'
        );

      setProperties(
        Array.isArray(saved)
          ? saved
          : []
      );

    } catch (error) {

      console.error(
        'Unable to load properties:',
        error
      );

      setProperties([]);

    }

  };


  /* =========================================================
     COUNTS
  ========================================================= */

  const totalProperties =
    properties.length;


  const saleProperties =
    properties.filter(
      (property) =>
        String(property.purpose || '')
          .toLowerCase() === 'sale'
    ).length;


  const rentProperties =
    properties.filter(
      (property) =>
        String(property.purpose || '')
          .toLowerCase() === 'rent'
    ).length;


  /* =========================================================
     FILTERED PROPERTIES
  ========================================================= */

  const filteredProperties =
    useMemo(() => {

      if (activeFilter === 'Sale') {

        return properties.filter(
          (property) =>
            String(property.purpose || '')
              .toLowerCase() === 'sale'
        );

      }


      if (activeFilter === 'Rent') {

        return properties.filter(
          (property) =>
            String(property.purpose || '')
              .toLowerCase() === 'rent'
        );

      }


      return properties;

    }, [properties, activeFilter]);


  /* =========================================================
     DELETE PROPERTY
  ========================================================= */

  const handleDelete = (id) => {

    const updatedProperties =
      properties.filter(
        (property) =>
          String(property.id) !== String(id)
      );


    setProperties(updatedProperties);


    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedProperties)
    );


    setDeleteId(null);

  };


  /* =========================================================
     PRICE DISPLAY
  ========================================================= */

  const formatPrice = (property) => {

    const price =
      Number(property.price || 0);


    const isRent =
      String(property.purpose || '')
        .toLowerCase() === 'rent';


    if (isRent) {

      return (
        <>
          ₹{price.toLocaleString('en-IN')}
          <span className="dashboard-price-unit">
            / month
          </span>
        </>
      );

    }


    return (
      <>
        ₹{price.toLocaleString('en-IN')}
      </>
    );

  };


  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (properties.length === 0) {

    return (

      <main className="dashboard-page">

        <section className="dashboard-container">

          <div className="dashboard-header">

            <div>

              <span className="dashboard-eyebrow">
                MY ACCOUNT
              </span>

              <h1>
                My Properties
              </h1>

              <p>
                Manage the properties you have
                posted on BestValueBuy.
              </p>

            </div>

          </div>


          <div className="dashboard-empty">

            <div className="dashboard-empty-icon">
              <Building2 size={34} />
            </div>

            <h2>
              No properties posted yet
            </h2>

            <p>
              Start by posting your property
              and reach potential buyers or tenants.
            </p>

            <Link
              to="/post-property"
              className="dashboard-primary-btn"
            >
              <Plus size={18} />
              Post Your Property
            </Link>

          </div>

        </section>

      </main>

    );

  }


  /* =========================================================
     MAIN DASHBOARD
  ========================================================= */

  return (

    <main className="dashboard-page">

      <section className="dashboard-container">


        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="dashboard-header">

          <div>

            <span className="dashboard-eyebrow">
              MY ACCOUNT
            </span>

            <h1>
              My Properties
            </h1>

            <p>
              Manage your property listings
              from one place.
            </p>

          </div>


          <Link
            to="/post-property"
            className="dashboard-primary-btn"
          >
            <Plus size={18} />
            Post Property
          </Link>

        </div>


        {/* ===================================================
            SUMMARY CARDS
        =================================================== */}

        <div className="dashboard-summary-grid">


          {/* TOTAL */}

          <button
            type="button"
            className={
              `dashboard-summary-card ${
                activeFilter === 'All'
                  ? 'active'
                  : ''
              }`
            }
            onClick={() =>
              setActiveFilter('All')
            }
          >

            <div className="dashboard-summary-icon">
              <LayoutDashboard size={21} />
            </div>

            <div>

              <span>
                Total Properties
              </span>

              <strong>
                {totalProperties}
              </strong>

            </div>

          </button>


          {/* SALE */}

          <button
            type="button"
            className={
              `dashboard-summary-card ${
                activeFilter === 'Sale'
                  ? 'active'
                  : ''
              }`
            }
            onClick={() =>
              setActiveFilter('Sale')
            }
          >

            <div className="dashboard-summary-icon">
              <Tag size={21} />
            </div>

            <div>

              <span>
                For Sale
              </span>

              <strong>
                {saleProperties}
              </strong>

            </div>

          </button>


          {/* RENT */}

          <button
            type="button"
            className={
              `dashboard-summary-card ${
                activeFilter === 'Rent'
                  ? 'active'
                  : ''
              }`
            }
            onClick={() =>
              setActiveFilter('Rent')
            }
          >

            <div className="dashboard-summary-icon">
              <Home size={21} />
            </div>

            <div>

              <span>
                For Rent
              </span>

              <strong>
                {rentProperties}
              </strong>

            </div>

          </button>

        </div>


        {/* ===================================================
            LIST HEADER
        =================================================== */}

        <div className="dashboard-list-header">

          <div>

            <h2>
              {activeFilter === 'All'
                ? 'All Properties'
                : `Properties For ${activeFilter}`
              }
            </h2>

            <span>
              {filteredProperties.length}{' '}
              {filteredProperties.length === 1
                ? 'property'
                : 'properties'}
            </span>

          </div>

        </div>


        {/* ===================================================
            PROPERTY LIST
        =================================================== */}

        {filteredProperties.length > 0 ? (

          <div className="dashboard-property-list">

            {filteredProperties.map(
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
                    className="dashboard-property-card"
                    key={property.id}
                  >


                    {/* =====================================
                        IMAGE
                    ===================================== */}

                    <div className="dashboard-property-image">

                      {image ? (

                        <img
                          src={image}
                          alt={
                            property.title ||
                            propertyType
                          }
                        />

                      ) : (

                        <div className="dashboard-no-image">
                          <Building2 size={32} />
                        </div>

                      )}


                      <span
                        className={
                          `dashboard-listing-badge ${
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

                    </div>


                    {/* =====================================
                        DETAILS
                    ===================================== */}

                    <div className="dashboard-property-content">


                      <div className="dashboard-property-top">

                        <div>

                          <span className="dashboard-property-type">
                            {propertyType}
                          </span>

                          <h3>
                            {property.title ||
                              `${propertyType} in ${location}`}
                          </h3>

                        </div>


                        {property.verified && (

                          <span className="dashboard-verified">

                            <CheckCircle2 size={14} />

                            Verified

                          </span>

                        )}

                      </div>


                      <div className="dashboard-property-location">

                        <MapPin size={15} />

                        <span>
                          {location || 'Location not provided'}
                        </span>

                      </div>


                      {/* PRICE */}

                      <div className="dashboard-property-price">

                        <IndianRupee size={17} />

                        <strong>
                          {formatPrice(property)}
                        </strong>

                      </div>


                      {/* DETAILS */}

                      <div className="dashboard-property-meta">

                        {(property.builtUpArea ||
                          property.area) && (

                          <span>

                            {property.builtUpArea ||
                              property.area}{' '}
                            sq.ft

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

                      <div className="dashboard-property-actions">


                        <Link
                          to={`/properties/${property.id}`}
                          className="dashboard-view-btn"
                        >
                          <Eye size={16} />
                          View
                        </Link>


                        <button
							  type="button"
							  className="dashboard-edit-btn"
							  onClick={() =>
								navigate(
								  `/post-property?edit=${property.id}`
								)
							  }
							>
							  <Pencil size={16} />
							  Edit
							</button>


                        <button
                          type="button"
                          className="dashboard-delete-btn"
                          onClick={() =>
                            setDeleteId(property.id)
                          }
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>

                      </div>

                    </div>

                  </article>

                );

              }
            )}

          </div>

        ) : (

          <div className="dashboard-filter-empty">

            <div className="dashboard-empty-icon">
              <Building2 size={30} />
            </div>

            <h3>
              No properties found
            </h3>

            <p>
              You don't have any properties
              under this category.
            </p>

            <button
              type="button"
              onClick={() =>
                setActiveFilter('All')
              }
              className="dashboard-secondary-btn"
            >
              View All Properties
            </button>

          </div>

        )}

      </section>


      {/* =====================================================
          DELETE CONFIRMATION
      ===================================================== */}

      {deleteId && (

        <div
          className="dashboard-modal-overlay"
          onClick={() =>
            setDeleteId(null)
          }
        >

          <div
            className="dashboard-delete-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="dashboard-modal-icon">
              <Trash2 size={24} />
            </div>

            <h2>
              Delete Property?
            </h2>

            <p>
              Are you sure you want to delete
              this property listing? This action
              cannot be undone.
            </p>


            <div className="dashboard-modal-actions">

              <button
                type="button"
                className="dashboard-modal-cancel"
                onClick={() =>
                  setDeleteId(null)
                }
              >
                Cancel
              </button>


              <button
                type="button"
                className="dashboard-modal-delete"
                onClick={() =>
                  handleDelete(deleteId)
                }
              >
                Delete Property
              </button>

            </div>

          </div>

        </div>

      )}

    </main>

  );
}