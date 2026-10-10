import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2, Home, MapPin, Pencil, Trash2, Eye, Plus,
  IndianRupee, CheckCircle2, Tag, LayoutDashboard, BadgeCheck
} from 'lucide-react';

const STORAGE_KEY = 'bestValueBuyUserProperties';

const getStatus = (property) => {
  const status = String(property.status || 'Active').toLowerCase();
  if (status === 'sold' || status === 'rented') return status;
  return 'active';
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [deleteId, setDeleteId] = useState(null);

  const loadProperties = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      setProperties(Array.isArray(saved) ? saved : []);
    } catch (error) {
      console.error('Unable to load properties:', error);
      setProperties([]);
    }
  };

  useEffect(() => { loadProperties(); }, []);

  const saveProperties = (updated) => {
    setProperties(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const saleProperties = properties.filter(p => String(p.purpose || '').toLowerCase() === 'sale');
  const rentProperties = properties.filter(p => String(p.purpose || '').toLowerCase() === 'rent');
  const soldProperties = properties.filter(p => getStatus(p) === 'sold');
  const rentedProperties = properties.filter(p => getStatus(p) === 'rented');
  const activeProperties = properties.filter(p => getStatus(p) === 'active');

  const filteredProperties = useMemo(() => {
    switch (activeFilter) {
      case 'Sale': return properties.filter(p => String(p.purpose || '').toLowerCase() === 'sale' && getStatus(p) === 'active');
      case 'Rent': return properties.filter(p => String(p.purpose || '').toLowerCase() === 'rent' && getStatus(p) === 'active');
      case 'Sold': return properties.filter(p => getStatus(p) === 'sold');
      case 'Rented': return properties.filter(p => getStatus(p) === 'rented');
      case 'Active': return activeProperties;
      default: return properties;
    }
  }, [properties, activeFilter]);

  const markStatus = (property, status) => {
    const message = status === 'sold'
      ? 'Mark this property as SOLD? It will remain in My Properties but be removed from active listings.'
      : 'Mark this rental as RENTED? It will remain in My Properties but be removed from active listings.';
    if (!window.confirm(message)) return;
    saveProperties(properties.map(p => String(p.id) === String(property.id)
      ? { ...p, status: status === 'sold' ? 'Sold' : 'Rented', statusUpdatedAt: new Date().toISOString() }
      : p));
  };

  const reactivate = (property) => {
    if (!window.confirm('Reactivate this property listing?')) return;
    saveProperties(properties.map(p => String(p.id) === String(property.id)
      ? { ...p, status: 'Active', statusUpdatedAt: new Date().toISOString() }
      : p));
  };

  const handleDelete = (id) => {
    saveProperties(properties.filter(p => String(p.id) !== String(id)));
    setDeleteId(null);
  };

  const formatPrice = (property) => {
    const price = Number(property.price || 0).toLocaleString('en-IN');
    return <>₹{price}{String(property.purpose || '').toLowerCase() === 'rent' && <span className="dashboard-price-unit"> / month</span>}</>;
  };

  const filterCards = [
    { key: 'All', label: 'Total Properties', count: properties.length, icon: <LayoutDashboard size={21} /> },
    { key: 'Sale', label: 'Active for Sale', count: saleProperties.filter(p => getStatus(p) === 'active').length, icon: <Tag size={21} /> },
    { key: 'Rent', label: 'Active for Rent', count: rentProperties.filter(p => getStatus(p) === 'active').length, icon: <Home size={21} /> },
    { key: 'Sold', label: 'Sold', count: soldProperties.length, icon: <BadgeCheck size={21} /> },
    { key: 'Rented', label: 'Rented', count: rentedProperties.length, icon: <CheckCircle2 size={21} /> },
  ];

  return (
    <main className="dashboard-page">
      <section className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <span className="dashboard-eyebrow">MY ACCOUNT</span>
            <h1>My Properties</h1>
            <p>Manage active listings, sold properties and rented properties in one place.</p>
          </div>
          <Link to="/post-property" className="dashboard-primary-btn"><Plus size={18} /> Post Property</Link>
        </div>

        <div className="dashboard-summary-grid dashboard-summary-grid-status">
          {filterCards.map(card => (
            <button key={card.key} type="button" className={`dashboard-summary-card ${activeFilter === card.key ? 'active' : ''} ${card.key === 'Sold' ? 'summary-sold' : ''} ${card.key === 'Rented' ? 'summary-rented' : ''}`} onClick={() => setActiveFilter(card.key)}>
              <div className="dashboard-summary-icon">{card.icon}</div>
              <div><span>{card.label}</span><strong>{card.count}</strong></div>
            </button>
          ))}
        </div>

        <div className="dashboard-list-header dashboard-list-header-status">
          <div><h2>{activeFilter === 'All' ? 'All Properties' : activeFilter === 'Sale' ? 'Active Properties For Sale' : activeFilter === 'Rent' ? 'Active Properties For Rent' : activeFilter === 'Sold' ? 'Sold Properties' : activeFilter === 'Rented' ? 'Rented Properties' : 'Active Properties'}</h2><span>{filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}</span></div>
          <div className="dashboard-status-filter" role="group" aria-label="Filter properties">
            {['All', 'Sale', 'Rent', 'Sold', 'Rented'].map(filter => <button key={filter} type="button" className={activeFilter === filter ? 'selected' : ''} onClick={() => setActiveFilter(filter)}>{filter === 'Sale' ? 'For Sale' : filter === 'Rent' ? 'For Rent' : filter}</button>)}
          </div>
        </div>

        {filteredProperties.length ? <div className="dashboard-property-list">
          {filteredProperties.map(property => {
            const isRent = String(property.purpose || '').toLowerCase() === 'rent';
            const status = getStatus(property);
            const isClosed = status === 'sold' || status === 'rented';
            const image = property.image || property.images?.[0];
            const propertyType = property.propertyType || property.type || 'Property';
            const location = property.location || [property.locality, property.city].filter(Boolean).join(', ');
            return (
              <article className={`dashboard-property-card ${isClosed ? 'dashboard-property-card-closed' : ''}`} key={property.id}>
                <div className={`dashboard-property-image ${isClosed ? 'dashboard-property-image-closed' : ''}`}>
                  {image ? <img src={image} alt={property.title || propertyType} /> : <div className="dashboard-no-image"><Building2 size={32} /></div>}
                  <span className={`dashboard-listing-badge ${isRent ? 'rent' : 'sale'}`}>{isRent ? 'FOR RENT' : 'FOR SALE'}</span>
                  {isClosed && <div className={`dashboard-closed-overlay ${status}`}><span>{status === 'sold' ? 'SOLD' : 'RENTED'}</span></div>}
                </div>
                <div className="dashboard-property-content">
                  <div className="dashboard-property-top"><div><span className="dashboard-property-type">{propertyType}</span><h3>{property.title || `${propertyType} in ${location}`}</h3></div>
                    {property.verified && <span className="dashboard-verified"><CheckCircle2 size={14} /> Verified</span>}
                  </div>
                  <div className="dashboard-property-location"><MapPin size={15} /><span>{location || 'Location not provided'}</span></div>
                  <div className="dashboard-property-price"><IndianRupee size={17} /><strong>{formatPrice(property)}</strong></div>
                  <div className="dashboard-property-meta">
                    {(property.builtUpArea || property.area) && <span>{property.builtUpArea || property.area} sq.ft</span>}
                    {property.beds && <span>{property.beds} BHK</span>}
                    {property.baths && <span>{property.baths} Bath</span>}
                  </div>
                  <div className="dashboard-property-status-row">
                    <span className={`dashboard-status-pill ${status}`}>{status === 'sold' ? 'Sold' : status === 'rented' ? 'Rented' : 'Active'}</span>
                    {isClosed && property.statusUpdatedAt && <span className="dashboard-status-date">Updated {new Date(property.statusUpdatedAt).toLocaleDateString('en-GB')}</span>}
                  </div>
                  <div className="dashboard-property-actions">
                    <Link to={`/properties/${property.id}`} className="dashboard-view-btn"><Eye size={16} /> View</Link>
                    {!isClosed && <Link to={`/post-property?edit=${property.id}`} className="dashboard-edit-btn"><Pencil size={16} /> Edit</Link>}
                    {!isClosed && (isRent
                      ? <button type="button" className="dashboard-mark-status-btn rented-action" onClick={() => markStatus(property, 'rented')}><CheckCircle2 size={16} /> Mark Rented</button>
                      : <button type="button" className="dashboard-mark-status-btn sold-action" onClick={() => markStatus(property, 'sold')}><BadgeCheck size={16} /> Mark Sold</button>)}
                    {isClosed && <button type="button" className="dashboard-reactivate-btn" onClick={() => reactivate(property)}>Reactivate</button>}
                    <button type="button" className="dashboard-delete-btn" onClick={() => setDeleteId(property.id)}><Trash2 size={16} /> Delete</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div> : <div className="dashboard-filter-empty"><div className="dashboard-empty-icon"><Building2 size={30} /></div><h3>{activeFilter === 'Sold' ? 'No sold properties yet' : activeFilter === 'Rented' ? 'No rented properties yet' : 'No properties found'}</h3><p>{activeFilter === 'Sold' ? 'When you sell a property, mark it as sold and it will appear here.' : activeFilter === 'Rented' ? 'When a rental property is occupied, mark it as rented and it will appear here.' : 'You do not have any properties under this category.'}</p><button type="button" onClick={() => setActiveFilter('All')} className="dashboard-secondary-btn">View All Properties</button></div>}
      </section>

      {deleteId !== null && <div className="dashboard-modal-overlay" onClick={() => setDeleteId(null)}><div className="dashboard-delete-modal" onClick={event => event.stopPropagation()}><div className="dashboard-modal-icon"><Trash2 size={24} /></div><h2>Delete Property?</h2><p>Are you sure you want to delete this property listing? This action cannot be undone.</p><div className="dashboard-modal-actions"><button type="button" className="dashboard-modal-cancel" onClick={() => setDeleteId(null)}>Cancel</button><button type="button" className="dashboard-modal-delete" onClick={() => handleDelete(deleteId)}>Delete Property</button></div></div></div>}
    </main>
  );
}
