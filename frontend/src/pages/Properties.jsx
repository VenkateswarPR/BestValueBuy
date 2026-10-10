import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import {
  MapPin,
  Heart,
  ShieldCheck,
  SlidersHorizontal,
  Search,
  X,
  ChevronDown
} from 'lucide-react';

import { properties, money } from '../data/properties';
import { getCurrentUser, readUserShortlist, toggleShortlist } from '../utils/demoAuth';

export default function Properties() {
  const [params] = useSearchParams();

  /* =========================================================
     URL PARAMETERS
  ========================================================= */

  const initialType = params.get('type') || 'All';
  const initialLocation = params.get('location') || '';

  const listingParam = params.get('listing');

  const listingType =
    listingParam === 'rent'
      ? 'Rent'
      : 'Sale';

  const isRent = listingType === 'Rent';


  /* =========================================================
     USER POSTED PROPERTIES
  ========================================================= */

  const [userProperties, setUserProperties] = useState([]);

  useEffect(() => {
    try {
      const savedProperties = JSON.parse(
        localStorage.getItem(
          'bestValueBuyUserProperties'
        ) || '[]'
      );

      setUserProperties(
        Array.isArray(savedProperties)
          ? savedProperties
          : []
      );
    } catch (error) {
      console.error(
        'Unable to load posted properties:',
        error
      );

      setUserProperties([]);
    }
  }, []);


  /* =========================================================
     FILTER STATE
  ========================================================= */

  const [query, setQuery] =
    useState(initialLocation);

  const [type, setType] =
    useState(initialType);

  const [minPrice, setMinPrice] =
    useState('');

  const [maxPrice, setMaxPrice] =
    useState('');

  const [minArea, setMinArea] =
    useState('');

  const [maxArea, setMaxArea] =
    useState('');

  const [bedrooms, setBedrooms] =
    useState('All');

  const [listedBy, setListedBy] =
    useState('All');

  const [sort, setSort] =
    useState('relevance');

  const [mobileFilters, setMobileFilters] =
    useState(false);


  /* =========================================================
     COMBINE DEMO + USER PROPERTIES
  ========================================================= */

  const allProperties = useMemo(() => {
    return [
      ...userProperties,
      ...properties
    ];
  }, [userProperties]);


  /* =========================================================
     FILTER PROPERTIES
  ========================================================= */

  const filteredProperties = useMemo(() => {
    let result = [...allProperties];


    /* ---------------------------------------------------------
       SALE / RENT
    --------------------------------------------------------- */

    result = result.filter(
      (property) =>
        (property.purpose || 'Sale')
          .toLowerCase() ===
        listingType.toLowerCase()
    );


    /* ---------------------------------------------------------
       SEARCH
    --------------------------------------------------------- */

    if (query.trim()) {
      const search =
        query.toLowerCase().trim();

      result = result.filter((property) =>
        [
          property.title,
          property.location,
          property.type,
          property.listedBy,
          property.city,
          property.locality
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(search)
      );
    }


    /* ---------------------------------------------------------
       PROPERTY TYPE
    --------------------------------------------------------- */

    if (type !== 'All') {
      result = result.filter(
        (property) =>
          property.type === type
      );
    }


    /* ---------------------------------------------------------
       MIN PRICE
       
       SALE:
       User enters Lakhs.
       
       RENT:
       User enters monthly rupees.
    --------------------------------------------------------- */

    if (minPrice) {
      const minimum = isRent
        ? Number(minPrice)
        : Number(minPrice) * 100000;

      result = result.filter(
        (property) =>
          Number(property.price) >= minimum
      );
    }


    /* ---------------------------------------------------------
       MAX PRICE
    --------------------------------------------------------- */

    if (maxPrice) {
      const maximum = isRent
        ? Number(maxPrice)
        : Number(maxPrice) * 100000;

      result = result.filter(
        (property) =>
          Number(property.price) <= maximum
      );
    }


    /* ---------------------------------------------------------
       MIN AREA
    --------------------------------------------------------- */

    if (minArea) {
      result = result.filter(
        (property) =>
          Number(property.area || 0) >=
          Number(minArea)
      );
    }


    /* ---------------------------------------------------------
       MAX AREA
    --------------------------------------------------------- */

    if (maxArea) {
      result = result.filter(
        (property) =>
          Number(property.area || 0) <=
          Number(maxArea)
      );
    }


    /* ---------------------------------------------------------
       BEDROOMS
    --------------------------------------------------------- */

    if (bedrooms !== 'All') {
      if (bedrooms === '4+') {
        result = result.filter(
          (property) =>
            Number(property.beds || 0) >= 4
        );
      } else {
        result = result.filter(
          (property) =>
            Number(property.beds || 0) ===
            Number(bedrooms)
        );
      }
    }


    /* ---------------------------------------------------------
       LISTED BY
    --------------------------------------------------------- */

    if (listedBy !== 'All') {
      result = result.filter(
        (property) =>
          property.listedBy?.toLowerCase() ===
          listedBy.toLowerCase()
      );
    }


    /* ---------------------------------------------------------
       SORT
    --------------------------------------------------------- */

    if (sort === 'price-low') {
      result.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );
    }

    if (sort === 'price-high') {
      result.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );
    }

    if (sort === 'area-low') {
      result.sort(
        (a, b) =>
          Number(a.area || 0) -
          Number(b.area || 0)
      );
    }

    if (sort === 'area-high') {
      result.sort(
        (a, b) =>
          Number(b.area || 0) -
          Number(a.area || 0)
      );
    }


    return result;

  }, [
    allProperties,
    listingType,
    isRent,
    query,
    type,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    bedrooms,
    listedBy,
    sort
  ]);


  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setQuery('');
    setType('All');
    setMinPrice('');
    setMaxPrice('');
    setMinArea('');
    setMaxArea('');
    setBedrooms('All');
    setListedBy('All');
    setSort('relevance');
  };


  const hasFilters =
    query ||
    type !== 'All' ||
    minPrice ||
    maxPrice ||
    minArea ||
    maxArea ||
    bedrooms !== 'All' ||
    listedBy !== 'All';


  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="properties-page">


      {/* =====================================================
          SEARCH HEADER
      ===================================================== */}

      <section className="properties-header">

        <div className="wrap">

          <div className="properties-heading">

            <div>

              <span className="eyebrow">
                {isRent
                  ? 'RENTAL PROPERTY SEARCH'
                  : 'PROPERTY SEARCH'}
              </span>

              <h1>
                {isRent
                  ? 'Find your next rental property'
                  : 'Find your next property'}
              </h1>

              <p>
                Search from properties listed by
                owners, brokers and builders.
              </p>

            </div>

          </div>


          {/* SEARCH BAR */}

          <div className="property-search">

            <div className="property-search-input">

              <MapPin size={19} />

              <input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Search city, locality or landmark"
              />

              {query && (
                <button
                  type="button"
                  onClick={() =>
                    setQuery('')
                  }
                  className="clear-search"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}

            </div>


            <select
              value={type}
              onChange={(event) =>
                setType(event.target.value)
              }
            >

              <option value="All">
                All Property Types
              </option>

              <option value="Land">
                Land
              </option>

              <option value="Individual House">
                Individual House
              </option>

              <option value="Apartment">
                Apartment
              </option>

              <option value="Villa">
                Villa
              </option>

            </select>


            <button
              type="button"
              className="property-search-btn"
            >
              <Search size={18} />
              Search
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="wrap properties-content">


        {/* MOBILE FILTER BUTTON */}

        <button
          type="button"
          className="mobile-filter-btn"
          onClick={() =>
            setMobileFilters(true)
          }
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>


        <div className="properties-layout">


          {/* =================================================
              FILTER PANEL
          ================================================= */}

          <aside
            className={`filter-panel ${
              mobileFilters
                ? 'mobile-filter-open'
                : ''
            }`}
          >

            <div className="filter-header">

              <div>

                <h3>Filters</h3>

                <span>
                  Refine your search
                </span>

              </div>

              <button
                type="button"
                className="filter-close"
                onClick={() =>
                  setMobileFilters(false)
                }
              >
                <X size={20} />
              </button>

            </div>


            {/* PROPERTY TYPE */}

            <FilterSection title="Property Type">

              {[
                'All',
                'Land',
                'Individual House',
                'Apartment',
                'Villa'
              ].map((propertyType) => (

                <button
                  key={propertyType}
                  type="button"
                  className={`filter-option ${
                    type === propertyType
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() =>
                    setType(propertyType)
                  }
                >

                  <span className="filter-radio">

                    {type === propertyType && (
                      <span />
                    )}

                  </span>

                  {propertyType}

                </button>

              ))}

            </FilterSection>


            {/* PRICE */}

            <FilterSection
              title={
                isRent
                  ? 'Monthly Rent'
                  : 'Price Range'
              }
            >

              <div className="filter-input-row">

                <div className="filter-input-wrap">

                  <span>₹</span>

                  <input
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={(event) =>
                      setMinPrice(
                        event.target.value
                      )
                    }
                    placeholder="Min"
                  />

                </div>


                <span className="range-separator">
                  —
                </span>


                <div className="filter-input-wrap">

                  <span>₹</span>

                  <input
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={(event) =>
                      setMaxPrice(
                        event.target.value
                      )
                    }
                    placeholder="Max"
                  />

                </div>

              </div>

              <small className="filter-help">

                {isRent
                  ? 'Enter monthly rent in rupees'
                  : 'Enter amount in lakhs'}

              </small>

            </FilterSection>


            {/* BEDROOMS */}

            <FilterSection title="Bedrooms">

              <div className="bedroom-options">

                {[
                  'All',
                  '1',
                  '2',
                  '3',
                  '4+'
                ].map((bedroom) => (

                  <button
                    key={bedroom}
                    type="button"
                    className={
                      bedrooms === bedroom
                        ? 'bedroom-btn active'
                        : 'bedroom-btn'
                    }
                    onClick={() =>
                      setBedrooms(bedroom)
                    }
                  >

                    {bedroom === 'All'
                      ? 'Any'
                      : bedroom === '4+'
                      ? '4+'
                      : `${bedroom} BHK`}

                  </button>

                ))}

              </div>

            </FilterSection>


            {/* AREA */}

            <FilterSection title="Property Area">

              <div className="filter-input-row">

                <div className="filter-input-wrap">

                  <input
                    type="number"
                    min="0"
                    value={minArea}
                    onChange={(event) =>
                      setMinArea(
                        event.target.value
                      )
                    }
                    placeholder="Min"
                  />

                  <span>sq.ft</span>

                </div>


                <span className="range-separator">
                  —
                </span>


                <div className="filter-input-wrap">

                  <input
                    type="number"
                    min="0"
                    value={maxArea}
                    onChange={(event) =>
                      setMaxArea(
                        event.target.value
                      )
                    }
                    placeholder="Max"
                  />

                  <span>sq.ft</span>

                </div>

              </div>

            </FilterSection>


            {/* LISTED BY */}

            <FilterSection title="Listed By">

              {[
                'All',
                'Owner',
                'Broker',
                'Builder'
              ].map((person) => (

                <button
                  key={person}
                  type="button"
                  className={`filter-option ${
                    listedBy === person
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() =>
                    setListedBy(person)
                  }
                >

                  <span className="filter-radio">

                    {listedBy === person && (
                      <span />
                    )}

                  </span>

                  {person === 'All'
                    ? 'Everyone'
                    : person}

                </button>

              ))}

            </FilterSection>


            {/* CLEAR */}

            {hasFilters && (

              <button
                type="button"
                className="clear-filters-btn"
                onClick={clearFilters}
              >

                <X size={16} />

                Clear all filters

              </button>

            )}

          </aside>


          {/* =================================================
              RESULTS
          ================================================= */}

          <div className="property-results">

            <div className="results-header">

              <div>

                <h2>

                  {filteredProperties.length}{' '}

                  {filteredProperties.length === 1
                    ? 'Property'
                    : 'Properties'}{' '}

                  Found

                </h2>

                <p>

                  {hasFilters
                    ? 'Matching your selected filters'
                    : `Showing all available ${
                        isRent
                          ? 'rental'
                          : 'sale'
                      } properties`}

                </p>

              </div>


              <div className="sort-control">

                <label htmlFor="sort">
                  Sort by
                </label>

                <div className="sort-select">

                  <select
                    id="sort"
                    value={sort}
                    onChange={(event) =>
                      setSort(
                        event.target.value
                      )
                    }
                  >

                    <option value="relevance">
                      Relevance
                    </option>

                    <option value="price-low">
                      Price: Low to High
                    </option>

                    <option value="price-high">
                      Price: High to Low
                    </option>

                    <option value="area-low">
                      Area: Low to High
                    </option>

                    <option value="area-high">
                      Area: High to Low
                    </option>

                  </select>

                  <ChevronDown size={16} />

                </div>

              </div>

            </div>


            {/* =================================================
                ACTIVE FILTERS
            ================================================= */}

            {hasFilters && (

              <div className="active-filters">

                {type !== 'All' && (
                  <FilterChip
                    label={type}
                    onRemove={() =>
                      setType('All')
                    }
                  />
                )}


                {query && (
                  <FilterChip
                    label={`Search: ${query}`}
                    onRemove={() =>
                      setQuery('')
                    }
                  />
                )}


                {minPrice && (
                  <FilterChip
                    label={
                      isRent
                        ? `Min ₹${Number(
                            minPrice
                          ).toLocaleString(
                            'en-IN'
                          )}`
                        : `Min ₹${minPrice}L`
                    }
                    onRemove={() =>
                      setMinPrice('')
                    }
                  />
                )}


                {maxPrice && (
                  <FilterChip
                    label={
                      isRent
                        ? `Max ₹${Number(
                            maxPrice
                          ).toLocaleString(
                            'en-IN'
                          )}`
                        : `Max ₹${maxPrice}L`
                    }
                    onRemove={() =>
                      setMaxPrice('')
                    }
                  />
                )}


                {minArea && (
                  <FilterChip
                    label={`Min ${minArea} sq.ft`}
                    onRemove={() =>
                      setMinArea('')
                    }
                  />
                )}


                {maxArea && (
                  <FilterChip
                    label={`Max ${maxArea} sq.ft`}
                    onRemove={() =>
                      setMaxArea('')
                    }
                  />
                )}


                {bedrooms !== 'All' && (
                  <FilterChip
                    label={`${bedrooms} BHK`}
                    onRemove={() =>
                      setBedrooms('All')
                    }
                  />
                )}


                {listedBy !== 'All' && (
                  <FilterChip
                    label={listedBy}
                    onRemove={() =>
                      setListedBy('All')
                    }
                  />
                )}

              </div>

            )}


            {/* =================================================
                PROPERTY RESULTS
            ================================================= */}

            {filteredProperties.length > 0 ? (

              <div className="property-results-grid">

                {filteredProperties.map(
                  (property) => (

                    <PropertyCard
                      key={property.id}
                      property={property}
                    />

                  )
                )}

              </div>

            ) : (

              <div className="no-results">

                <div className="no-results-icon">
                  <Search size={28} />
                </div>

                <h3>
                  No properties found
                </h3>

                <p>
                  We couldn't find properties
                  matching your current filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   FILTER SECTION
========================================================= */

function FilterSection({
  title,
  children
}) {
  return (
    <div className="filter-section">

      <h4>
        {title}
      </h4>

      {children}

    </div>
  );
}


/* =========================================================
   FILTER CHIP
========================================================= */

function FilterChip({
  label,
  onRemove
}) {
  return (
    <button
      type="button"
      className="filter-chip"
      onClick={onRemove}
    >

      {label}

      <X size={14} />

    </button>
  );
}


/* =========================================================
   PROPERTY CARD
========================================================= */


function PropertyCard({ property }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(() =>
    readUserShortlist(getCurrentUser()).includes(String(property.id))
  );

  useEffect(() => {
    const refreshSavedState = () => {
      const user = getCurrentUser();
      setIsSaved(readUserShortlist(user).includes(String(property.id)));
    };

    refreshSavedState();
    window.addEventListener('bvb-auth-change', refreshSavedState);
    window.addEventListener('bvb-shortlist-change', refreshSavedState);
    window.addEventListener('storage', refreshSavedState);

    return () => {
      window.removeEventListener('bvb-auth-change', refreshSavedState);
      window.removeEventListener('bvb-shortlist-change', refreshSavedState);
      window.removeEventListener('storage', refreshSavedState);
    };
  }, [property.id]);

  const isRent =
    String(property.purpose || 'Sale').toLowerCase() === 'rent';

  const image =
    property.image ||
    (typeof property.images?.[0] === 'string'
      ? property.images[0]
      : property.images?.[0]?.dataUrl) ||
    '';

  const area = Number(
    property.area ||
    property.builtUpArea ||
    property.plotArea ||
    0
  );

  const beds = Number(
    property.beds ??
    property.bedrooms ??
    0
  );

  const baths = Number(
    property.baths ??
    property.bathrooms ??
    0
  );

  const listedBy = property.listedBy || 'Owner';
  const hasSpecs = area > 0 || beds > 0 || baths > 0;

  const handleShortlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!getCurrentUser()) {
      navigate('/login', {
        state: {
          from: `${location.pathname}${location.search}`
        }
      });
      return;
    }

    const result = toggleShortlist(property.id);

    if (result.requiresLogin) {
      navigate('/login', {
        state: {
          from: `${location.pathname}${location.search}`
        }
      });
      return;
    }

    setIsSaved(result.isSaved);
  };

  return (
    <Link
      to={`/properties/${property.id}`}
      className="search-property-card"
    >
      <div className="search-card-image">
        {image ? (
          <img src={image} alt={property.title || 'Property'} />
        ) : (
          <div className="search-card-image-empty">
            No Image
          </div>
        )}

        <span className="search-sale-tag">
          {isRent ? 'For Rent' : 'For Sale'}
        </span>

        {property.isUserPosted && (
          <span className="search-user-tag">
            New Listing
          </span>
        )}

        <button
          type="button"
          className={`search-favorite${isSaved ? ' is-saved' : ''}`}
          onClick={handleShortlist}
          aria-label={isSaved ? 'Remove from shortlist' : 'Add to shortlist'}
          aria-pressed={isSaved}
          title={isSaved ? 'Remove from shortlist' : 'Add to shortlist'}
        >
          <Heart size={19} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="search-card-content">
        <div className="search-card-price">
          {money(Number(property.price) || 0)}
          {isRent && (
            <span className="rent-price-label"> / month</span>
          )}
        </div>

        <h3>{property.title}</h3>

        <p className="search-location">
          <MapPin size={15} />
          {property.location ||
            [property.locality, property.city].filter(Boolean).join(', ') ||
            'Location not provided'}
        </p>

        {hasSpecs && (
          <div className="search-card-specs">
            {area > 0 && (
              <span>
                {area.toLocaleString('en-IN')} sq.ft
              </span>
            )}

            {beds > 0 && <span>{beds} Beds</span>}

            {baths > 0 && <span>{baths} Baths</span>}
          </div>
        )}

        <div className="search-card-footer">
          <span>{listedBy}</span>

          {property.verified && (
            <span className="verified-badge">
              <ShieldCheck size={14} />
              Verified
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
