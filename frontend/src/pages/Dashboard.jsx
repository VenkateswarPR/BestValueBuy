
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const STORAGE_KEY = 'bestValueBuyUserProperties';

export default function Dashboard() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [deleteId, setDeleteId] = useState(null);

  // Load saved properties
  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]'
      );

      setProperties(Array.isArray(saved) ? saved : []);
    } catch (error) {
      console.error('Unable to load properties:', error);
      setProperties([]);
    }
  };

  // Summary counts
  const totalProperties = properties.length;

  const saleProperties = properties.filter(
    (property) =>
      String(property.purpose || '').toLowerCase() === 'sale'
  ).length;

  const rentProperties = properties.filter(
    (property) =>
      String(property.purpose || '').toLowerCase() === 'rent'
  ).length;

  // Filter properties
  const filteredProperties = useMemo(() => {
    if (activeFilter === 'Sale') {
      return properties.filter(
        (property) =>
          String(property.purpose || '').toLowerCase() === 'sale'
      );
    }

    if (activeFilter === 'Rent') {
      return properties.filter(
        (property) =>
          String(property.purpose || '').toLowerCase() === 'rent'
      );
    }

    return properties;
  }, [properties, activeFilter]);

  // Delete property
  const handleDelete = (id) => {
    const updatedProperties = properties.filter(
      (property) => String(property.id) !== String(id)
    );

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedProperties)
      );

      setProperties(updatedProperties);
      setDeleteId(null);
    } catch (error) {
      console.error('Unable to delete property:', error);
      alert('Unable to delete the property. Please try again.');
    }
  };

  // Format property price
  const formatPrice = (property) => {
    const price = Number(property.price || 0);

    const isRent =
      String(property.purpose || '').toLowerCase() === 'rent';

    return (
      <>
        ₹{price.toLocaleString('en-IN')}
        {isRent && (
          <span className="dashboard-price-unit">
            {' '}/ month
          </span>
        )}
      </>
    );
  };

  // Empty state
  if (properties.length === 0) {
    return (
      <main className="dashboard-page">
        <section className="dashboard-container">
          <div className="dashboard-header">
            <div>
              <span className="dashboard-eyebrow">
                MY ACCOUNT
              </span>

              <h1>My Properties</h1>

              <p>
                Manage the properties you have posted on
                BestValueBuy.
              </p>
            </div>
          </div>

          <div className="dashboard-empty">
            <div className="dashboard-empty-icon">
              <Building2 size={34} />
            </div>

            <h2>No properties posted yet</h2>

            <p>
              Start by posting your property and reach
              potential buyers or tenants.
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

  return (
    <main className="dashboard-page">
      <section className="dashboard-container">

        {/* Header */}
        <div className="dashboard-header">
          <div>
            <span className="dashboard-eyebrow">
              MY ACCOUNT
            </span>

            <h1>My Properties</h1>

            <p>
              Manage your property listings from one place.
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

        {/* Summary cards */}
        <div className="dashboard-summary-grid">

          <button
            type="button"
            className={`dashboard-summary-card ${
              activeFilter === 'All' ? 'active' : ''
            }`}
            onClick={() => setActiveFilter('All')}
          >
            <div className="dashboard-summary-icon">
              <LayoutDashboard size={21} />
            </div>

            <div>
              <span>Total Properties</span>
              <strong>{totalProperties}</strong>
            </div>
          </button>

          <button
            type="button"
            className={`dashboard-summary-card ${
              activeFilter === 'Sale' ? 'active' : ''
            }`}
            onClick={() => setActiveFilter('Sale')}
          >
            <div className="dashboard-summary-icon">
              <Tag size={21} />
            </div>

            <div>
              <span>For Sale</span>
              <strong>{saleProperties}</strong>
            </div>
          </button>

          <button
            type="button"
            className={`dashboard-summary-card ${
              activeFilter === 'Rent' ? 'active' : ''
            }`}
            onClick={() => setActiveFilter('Rent')}
          >
            <div className="dashboard-summary-icon">
              <Home size={21} />
            </div>

            <div>
              <span>For Rent</span>
              <strong>{rentProperties}</strong>
            </div>
          </button>

        </div>

        {/* Property list heading */}
        <div className="dashboard-list-header">
          <div>
            <h2>
              {activeFilter === 'All'
                ? 'All Properties'
                : `Properties For ${activeFilter}`}
            </h2>

            <span>
              {filteredProperties.length}{' '}
              {filteredProperties.length === 1
                ? 'property'
                : 'properties'}
            </span>
          </div>
        </div>

        {/* Property cards */}
        {filteredProperties.length > 0 ? (
          <div className="dashboard-property-list">

            {filteredProperties.map((property) => {
              const isRent =
                String(property.purpose || '').toLowerCase() ===
                'rent';

              const image =
                property.image || property.images?.[0];

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

              // Normalize area values.
              // Values such as "000", 0, and invalid strings
              // should not create an empty or unwanted detail.
              const rawArea =
                property.builtUpArea || property.area;

              const area = Number(rawArea);
              const hasValidArea =
                rawArea !== null &&
                rawArea !== undefined &&
                String(rawArea).trim() !== '' &&
                Number.isFinite(area) &&
                area > 0;

              const beds = Number(property.beds);
              const baths = Number(property.baths);

              return (
                <article
                  className="dashboard-property-card"
                  key={property.id}
                >

                  {/* Property image */}
                  <div className="dashboard-property-image">
                    {image ? (
                      <img
                        src={image}
                        alt={property.title || propertyType}
                      />
                    ) : (
                      <div className="dashboard-no-image">
                        <Building2 size={32} />
                      </div>
                    )}

                    <span
                      className={`dashboard-listing-badge ${
                        isRent ? 'rent' : 'sale'
                      }`}
                    >
                      {isRent ? 'FOR RENT' : 'FOR SALE'}
                    </span>
                  </div>

                  {/* Property details */}
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

                    {/* Location */}
                    <div className="dashboard-property-location">
                      <MapPin size={15} />

                      <span>
                        {location || 'Location not provided'}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="dashboard-property-price">
                      <IndianRupee size={17} />

                      <strong>
                        {formatPrice(property)}
                      </strong>
                    </div>

                    {/* Details: hide zero or invalid values */}
                    <div className="dashboard-property-meta">
                      {hasValidArea && (
                        <span>
                          {area.toLocaleString('en-IN')} sq.ft
                        </span>
                      )}

                      {Number.isFinite(beds) && beds > 0 && (
                        <span>{beds} BHK</span>
                      )}

                      {Number.isFinite(baths) && baths > 0 && (
                        <span>{baths} Bath</span>
                      )}
                    </div>

                    {/* Actions */}
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
                        onClick={() => setDeleteId(property.id)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>
                  </div>
                </article>
              );
            })}

          </div>
        ) : (
          <div className="dashboard-filter-empty">
            <div className="dashboard-empty-icon">
              <Building2 size={30} />
            </div>

            <h3>No properties found</h3>

            <p>
              You don't have any properties under this category.
            </p>

            <button
              type="button"
              onClick={() => setActiveFilter('All')}
              className="dashboard-secondary-btn"
            >
              View All Properties
            </button>
          </div>
        )}

      </section>

      {/* Delete confirmation modal */}
      {deleteId !== null && (
        <div
          className="dashboard-modal-overlay"
          onClick={() => setDeleteId(null)}
        >
          <div
            className="dashboard-delete-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="dashboard-modal-icon">
              <Trash2 size={24} />
            </div>

            <h2>Delete Property?</h2>

            <p>
              Are you sure you want to delete this property
              listing? This action cannot be undone.
            </p>

            <div className="dashboard-modal-actions">
              <button
                type="button"
                className="dashboard-modal-cancel"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="dashboard-modal-delete"
                onClick={() => handleDelete(deleteId)}
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
