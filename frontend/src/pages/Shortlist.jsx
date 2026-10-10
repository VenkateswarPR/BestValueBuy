import React, { useCallback, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Heart, MapPin, Trash2, Eye, Building2, LogIn } from 'lucide-react';
import { properties, money } from '../data/properties';
import { getCurrentUser, readUserShortlist, writeUserShortlist } from '../utils/demoAuth';
import '../styles/auth-shortlist.css';

export default function Shortlist() {
  const [user, setUser] = useState(() => getCurrentUser());
  const [ids, setIds] = useState(() => readUserShortlist(getCurrentUser()));
  const [savedProperties, setSavedProperties] = useState([]);

  const load = useCallback(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    if (!currentUser) { setIds([]); setSavedProperties([]); return; }
    const currentIds = readUserShortlist(currentUser);
    setIds(currentIds);
    let userProperties = [];
    try {
      const parsed = JSON.parse(localStorage.getItem('bestValueBuyUserProperties') || '[]');
      userProperties = Array.isArray(parsed) ? parsed : [];
    } catch { userProperties = []; }
    const all = [...userProperties, ...properties];
    const unique = new Map();
    all.forEach(property => unique.set(String(property.id), property));
    setSavedProperties(currentIds.map(id => unique.get(String(id))).filter(Boolean));
  }, []);

  useEffect(() => {
    load();
    window.addEventListener('bvb-auth-change', load);
    window.addEventListener('bvb-shortlist-change', load);
    window.addEventListener('storage', load);
    return () => {
      window.removeEventListener('bvb-auth-change', load);
      window.removeEventListener('bvb-shortlist-change', load);
      window.removeEventListener('storage', load);
    };
  }, [load]);

  if (!user) {
    return (
      <main className="shortlist-page">
        <section className="shortlist-container">
          <header className="shortlist-header"><span className="shortlist-eyebrow">MY ACCOUNT</span><h1>Shortlist</h1><p>Log in to save and compare your favourite properties.</p></header>
          <div className="shortlist-empty">
            <div className="shortlist-empty-icon"><LogIn size={34} /></div>
            <h2>Log in to view your shortlist</h2>
            <p>Your saved properties are linked to your account. Log in or create an account to continue.</p>
            <Link to="/login" state={{ from: '/shortlist' }} className="shortlist-browse-btn">Log In</Link>
            <p className="bvb-shortlist-secondary">New to BestValueBuy? <Link to="/register">Create an account</Link></p>
          </div>
        </section>
      </main>
    );
  }

  const remove = (id) => {
    const updated = ids.filter(savedId => String(savedId) !== String(id));
    writeUserShortlist(updated, user);
    setIds(updated);
    setSavedProperties(previous => previous.filter(property => String(property.id) !== String(id)));
  };

  const formatPrice = property => {
    const price = Number(property.price || 0);
    return <>{money(price)}{String(property.purpose || '').toLowerCase() === 'rent' && <span className="shortlist-price-unit"> / month</span>}</>;
  };

  return (
    <main className="shortlist-page">
      <section className="shortlist-container">
        <header className="shortlist-header"><span className="shortlist-eyebrow">MY ACCOUNT</span><h1>Shortlist</h1><p>Properties you have saved for later.</p></header>
        {savedProperties.length === 0 ? (
          <div className="shortlist-empty">
            <div className="shortlist-empty-icon"><Heart size={34} /></div>
            <h2>Your shortlist is empty</h2>
            <p>Browse properties and tap the heart to save the ones you like.</p>
            <Link to="/properties" className="shortlist-browse-btn">Browse Properties</Link>
          </div>
        ) : (
          <>
            <div className="shortlist-count"><Heart size={17} /><span>{savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} shortlisted</span></div>
            <div className="shortlist-grid">
              {savedProperties.map(property => {
                const isRent = String(property.purpose || '').toLowerCase() === 'rent';
                const image = property.image || (typeof property.images?.[0] === 'string' ? property.images[0] : property.images?.[0]?.dataUrl);
                const type = property.propertyType || property.type || 'Property';
                const location = property.location || [property.locality, property.city].filter(Boolean).join(', ');
                const area = Number(property.area || property.builtUpArea || property.plotArea || 0);
                const beds = Number(property.beds ?? property.bedrooms ?? 0);
                const baths = Number(property.baths ?? property.bathrooms ?? 0);
                return (
                  <article className="shortlist-card" key={property.id}>
                    <div className="shortlist-image">
                      {image ? <img src={image} alt={property.title || type} /> : <div className="shortlist-no-image"><Building2 size={35} /></div>}
                      <span className={`shortlist-purpose ${isRent ? 'rent' : 'sale'}`}>{isRent ? 'FOR RENT' : 'FOR SALE'}</span>
                      <button type="button" className="shortlist-remove" onClick={() => remove(property.id)} aria-label="Remove from shortlist"><Heart size={19} fill="currentColor" /></button>
                    </div>
                    <div className="shortlist-card-content">
                      <span className="shortlist-property-type">{type}</span>
                      <h2>{property.title || `${type}${location ? ` in ${location}` : ''}`}</h2>
                      <div className="shortlist-location"><MapPin size={15} /><span>{location || 'Location not provided'}</span></div>
                      <div className="shortlist-price">{formatPrice(property)}</div>
                      {(area > 0 || beds > 0 || baths > 0) && <div className="shortlist-meta">{area > 0 && <span>{area.toLocaleString('en-IN')} sq.ft</span>}{beds > 0 && <span>{beds} Beds</span>}{baths > 0 && <span>{baths} Baths</span>}</div>}
                      <div className="shortlist-actions"><Link to={`/properties/${property.id}`} className="shortlist-view-btn"><Eye size={16} />View Property</Link><button type="button" className="shortlist-delete-btn" onClick={() => remove(property.id)} aria-label="Delete from shortlist"><Trash2 size={16} /></button></div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
