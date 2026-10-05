import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  ShieldCheck,
  UserRound,
  KeyRound,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { properties, money } from '../data/properties';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-copy">

            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              INDIA'S PROPERTY MARKETPLACE
            </div>

            <h1>
              Find the right property.
              <br />
              <em>Get the best value.</em>
            </h1>

           <p className="hero-description">
			  Discover land, apartments, independent houses and villas
			  from owners, brokers and builders.
			</p>

            {/* SEARCH BOX */}
            <div className="search-box">

              <div className="search-tabs">
				  <Link className="active" to="/properties">
					Buy Property
				  </Link>

				  <Link to="/post-property">
					Sell Property
				  </Link>
				</div>

              <div className="search-row">

                <div className="search-location">
                  <MapPin size={20} />
                  <input
                    type="text"
                    placeholder="Search city, locality or landmark"
                  />
                </div>

                <select defaultValue="">
                  <option value="">All Property Types</option>
                  <option value="Land">Land</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Individual House">
                    Individual House
                  </option>
                  <option value="Villa">Villa</option>
                </select>

                <Link to="/properties" className="search-btn">
                  <Search size={19} />
                  Search
                </Link>

              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="hero-quick-links">
              <span>Popular:</span>

              <Link to="/properties?location=Chennai">
                Chennai
              </Link>

              <Link to="/properties?location=Coimbatore">
                Coimbatore
              </Link>

              <Link to="/properties?location=Bangalore">
                Bangalore
              </Link>

              <Link to="/properties?location=Hyderabad">
                Hyderabad
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="wrap section">

        <div className="section-head">

          <div>
            <span className="eyebrow">EXPLORE PROPERTIES</span>

            <h2>
              What are you looking for?
            </h2>
          </div>

          <Link className="section-link" to="/properties">
            View all properties
            <ArrowRight size={17} />
          </Link>

        </div>

        <div className="category-grid">

          {[
            {
              name: 'Land',
              imageClass: 'c1',
              description: 'Plots & land'
            },
            {
              name: 'Individual House',
              imageClass: 'c2',
              description: 'Independent homes'
            },
            {
              name: 'Apartment',
              imageClass: 'c3',
              description: 'Flats & apartments'
            },
            {
              name: 'Villa',
              imageClass: 'c4',
              description: 'Premium villas'
            }
          ].map((category) => (

            <Link
              key={category.name}
              to={`/properties?type=${encodeURIComponent(
                category.name
              )}`}
              className="category"
            >

              <div
                className={`category-img ${category.imageClass}`}
              >
                <div className="category-overlay">
                  Explore
                  <ArrowRight size={16} />
                </div>
              </div>

              <div className="category-content">

                <strong>
                  {category.name}
                </strong>

                <span>
                  {category.description}
                </span>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* FEATURED PROPERTIES */}
      <section className="wrap section featured-section">

        <div className="section-head">

          <div>
            <span className="eyebrow">
              FEATURED PROPERTIES
            </span>

            <h2>
              Properties worth seeing
            </h2>
          </div>

          <Link className="section-link" to="/properties">
            Browse all
            <ArrowRight size={17} />
          </Link>

        </div>

        <div className="property-grid">

          {properties.slice(0, 3).map((property) => (
            <PropertyCard
              key={property.id}
              p={property}
            />
          ))}

        </div>

      </section>

      {/* SELL CTA */}
      <section className="sell-section">

        <div className="wrap sell-content">

          <div>

            <span className="eyebrow">
              HAVE A PROPERTY?
            </span>

            <h2>
              Sell your property with BestValueBuy.
            </h2>

            <p>
              Reach genuine buyers looking for properties like yours.
            </p>

          </div>

          <Link
            to="/post-property"
            className="sell-btn"
          >
            Post your property
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

      {/* TRUST SECTION */}
      <section className="trust">

        <div className="wrap">

          <div className="trust-heading">

            <span className="eyebrow">
              WHY BESTVALUEBUY
            </span>

            <h2>
              Property search made simpler.
            </h2>

          </div>

          <div className="trust-grid">

            <TrustCard
              icon={<ShieldCheck />}
              title="Verified listings"
              text="We design the platform to make property information clearer and safer."
            />

            <TrustCard
              icon={<UserRound />}
              title="Owner & broker options"
              text="Know who is offering the property before you decide to contact them."
            />

            <TrustCard
              icon={<KeyRound />}
              title="Simple property search"
              text="Use practical filters to quickly narrow down properties that fit your needs."
            />

          </div>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="final-cta">

        <div className="wrap">

          <CheckCircle2 size={28} />

          <h2>
            Your next property could be here.
          </h2>

          <p>
            Start exploring properties today.
          </p>

          <Link to="/properties">
            Explore properties
            <ArrowRight size={17} />
          </Link>

        </div>

      </section>
    </>
  );
}


/* PROPERTY CARD */

function PropertyCard({ p }) {

  return (

    <Link
      to={`/properties/${p.id}`}
      className="property-card"
    >

      <div className="card-img">

        <img
          src={p.image}
          alt={p.title}
        />

        <span className="sale-tag">
          For Sale
        </span>

        <button
          className="favorite-btn"
          onClick={(event) => event.preventDefault()}
          aria-label="Save property"
        >
          ♡
        </button>

      </div>

      <div className="card-body">

        <div className="price">
          {money(p.price)}
        </div>

        <h3>
          {p.title}
        </h3>

        <p className="muted">
          <MapPin size={15} />
          {p.location}
        </p>

        <div className="specs">

          <span>
            {p.area.toLocaleString('en-IN')} sq.ft
          </span>

          {p.beds > 0 && (
            <>
              <span>{p.beds} Beds</span>
              <span>{p.baths} Baths</span>
            </>
          )}

        </div>

        <div className="listed">

          {p.verified && (
            <ShieldCheck size={15} />
          )}

          <span>
            {p.listedBy}
          </span>

          {p.verified && (
            <small>
              Verified
            </small>
          )}

        </div>

      </div>

    </Link>

  );
}


/* TRUST CARD */

function TrustCard({ icon, title, text }) {

  return (

    <div className="trust-card">

      <div className="trust-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

    </div>

  );

}