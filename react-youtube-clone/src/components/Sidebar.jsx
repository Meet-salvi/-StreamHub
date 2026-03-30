import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const categories = [
  { name: 'Home', icon: 'bi bi-house-door-fill', url: '/' },
  { name: 'Shorts', icon: 'bi bi-lightning', url: '/shorts/UCMhe8jmac-tWKU0Vj_OXDvA' },
  { name: 'Subscriptions', icon: 'bi bi-collection-play', url: '/subscriptions' },
];

const secondaryCategories = [
  { name: 'You', icon: 'bi bi-person-square', url: '/profile' },
  { name: 'History', icon: 'bi bi-clock-history', url: '/history' },
];

const exploreCategories = [
  { name: 'Trending', icon: 'bi bi-fire', url: '/trending' },
  { name: 'Music', icon: 'bi bi-music-note', url: '/category/music' },
  { name: 'Movies', icon: 'bi bi-film', url: '/category/movies' },
  { name: 'Live', icon: 'bi bi-broadcast', url: '/category/live' },
  { name: 'Gaming', icon: 'bi bi-controller', url: '/category/gaming' },
  { name: 'News', icon: 'bi bi-newspaper', url: '/category/news' },
  { name: 'Sports', icon: 'bi bi-trophy', url: '/category/sports' },
];

const Sidebar = () => {
  const location = useLocation();

  const activeCategoryUrl = location.pathname;

  return (
    <div className="sidebar bg-black text-white h-100 overflow-y-auto px-2" style={{ width: '240px' }}>
      <ul className="list-unstyled pt-2">
        {categories.map((category) => (
          <li key={category.name} className="mb-0">
            <Link 
               to={category.url} 
               className={`text-decoration-none text-light d-flex align-items-center rounded-lg px-3 py-2 ${activeCategoryUrl === category.url ? 'bg-secondary bg-opacity-25 fw-bold' : 'hover-bg-dark'}`}
            >
              <i className={`${category.icon} me-3`} style={{ fontSize: '20px' }}></i>
              <span style={{ fontSize: '14px' }}>{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <hr className="my-2 border-secondary" />

      <ul className="list-unstyled">
        {secondaryCategories.map((category) => (
          <li key={category.name} className="mb-0">
            <Link 
               to={category.url} 
               className="text-decoration-none text-light d-flex align-items-center rounded-lg px-3 py-2 hover-bg-dark"
            >
              <i className={`${category.icon} me-3`} style={{ fontSize: '20px' }}></i>
              <span style={{ fontSize: '14px' }}>{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <hr className="my-2 border-secondary" />

      <h6 className="px-3 pt-2 text-white fw-bold mb-2">Explore</h6>
      <ul className="list-unstyled">
        {exploreCategories.map((category) => (
          <li key={category.name} className="mb-0">
            <Link 
               to={category.url} 
               className={`text-decoration-none text-light d-flex align-items-center rounded-lg px-3 py-2 ${activeCategoryUrl === category.url ? 'bg-secondary bg-opacity-25 fw-bold' : 'hover-bg-dark'}`}
            >
              <i className={`${category.icon} me-3`} style={{ fontSize: '20px' }}></i>
              <span style={{ fontSize: '14px' }}>{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <hr className="my-2 border-secondary" />
      <div className="px-3 py-2 text-white-50" style={{ fontSize: '12px', fontWeight: '500' }}>
        <p className="mb-1">About Press Copyright Contact us Creators Advertise Developers</p>
        <p className="mb-3">Terms Privacy Policy & Safety How StreamHub works Test new features</p>
        <p className="mt-3 text-secondary">© 2026 Google LLC</p>
      </div>
    </div>
  );
};

export default Sidebar;
