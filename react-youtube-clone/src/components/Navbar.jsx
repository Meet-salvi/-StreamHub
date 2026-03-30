import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  const handleFeatureSoon = (featureName) => {
    alert(`${featureName} feature coming soon!`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
      setShowMobileSearch(false);
    }
  };

  if (showMobileSearch) {
    return (
      <nav className="navbar navbar-expand-lg bg-black p-0 sticky-top d-flex align-items-center px-2 w-100" style={{ height: '56px' }}>
        <button className="btn text-light border-0 me-1 p-2" onClick={() => setShowMobileSearch(false)}>
          <i className="bi bi-arrow-left" style={{ fontSize: '20px' }}></i>
        </button>
        <form className="d-flex flex-grow-1 align-items-center" onSubmit={handleSubmit}>
          <input
            className="form-control bg-dark text-light border-secondary rounded-pill w-100"
            style={{ padding: '8px 16px', fontSize: '16px' }}
            type="search"
            placeholder="Search"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div 
          className="ms-2 d-flex align-items-center justify-content-center flex-shrink-0" 
          onClick={() => handleFeatureSoon('Voice Search')}
          style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#181818', cursor: 'pointer' }}
        >
            <i className="fa fa-microphone text-light" style={{ fontSize: '18px' }}></i>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg bg-black p-0 sticky-top d-flex align-items-center justify-content-between px-2 px-sm-3 w-100 overflow-hidden" style={{ height: '56px' }}>
      <div className="d-flex align-items-center flex-shrink-0">
        <div className="d-flex align-items-center justify-content-center me-3 hover-dark-circle" style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }} onClick={toggleSidebar}>
          <i className="bi bi-list text-light" style={{ fontSize: '24px' }}></i>
        </div>
        
        <Link to="/" className="d-flex align-items-center text-decoration-none" title="StreamHub Home">
          <i className="bi bi-play-btn-fill text-danger me-2" style={{ fontSize: '26px' }}></i>
          <span className="text-white fw-bolder d-none d-sm-block" style={{ fontSize: '20px', letterSpacing: '-0.5px' }}>StreamHub</span>
        </Link>
      </div>

      <div className="d-none d-sm-flex align-items-center justify-content-center flex-grow-1 mx-4" style={{ maxWidth: '720px' }}>
        <form className="d-flex w-100 align-items-center" onSubmit={handleSubmit}>
          <div className="d-flex w-100" style={{ maxWidth: '600px' }}>
            <div className="flex-grow-1 position-relative">
              <input
                className="form-control bg-black text-light border-secondary ps-3"
                style={{ 
                  borderRadius: '40px 0 0 40px', 
                  border: '1px solid #303030', 
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
                  height: '40px',
                  fontSize: '16px'
                }}
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="btn border-0 d-flex align-items-center justify-content-center" 
              style={{ 
                borderRadius: '0 40px 40px 0', 
                backgroundColor: '#222222', 
                border: '1px solid #303030', 
                borderLeft: 'none', 
                width: '64px',
                height: '40px'
              }}
            >
              <i className="fa fa-search text-light" style={{ fontSize: '18px', opacity: '0.8' }}></i>
            </button>
          </div>
          <div 
            className="ms-3 d-flex align-items-center justify-content-center hover-dark-circle" 
            onClick={() => handleFeatureSoon('Voice Search')}
            style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#181818', cursor: 'pointer' }}
          >
             <i className="fa fa-microphone text-light" style={{ fontSize: '18px' }}></i>
          </div>
        </form>
      </div>

      <div className="d-flex align-items-center justify-content-end flex-shrink-0 pe-2" style={{ minWidth: 'auto' }}>
        {/* Mobile Icons */}
        <div className="d-sm-none d-flex align-items-center justify-content-center me-1" onClick={() => setShowMobileSearch(true)} style={{ width: '40px', height: '40px', cursor: 'pointer' }}>
          <i className="fa fa-search text-white" style={{ fontSize: '18px' }}></i>
        </div>
        <div className="d-sm-none d-flex align-items-center justify-content-center me-1" onClick={() => handleFeatureSoon('Voice Search')} style={{ width: '40px', height: '40px', cursor: 'pointer' }}>
          <i className="fa fa-microphone text-white" style={{ fontSize: '18px' }}></i>
        </div>

        {/* Desktop Icons */}
        <div className="d-none d-md-flex align-items-center">
          <div className="d-flex align-items-center justify-content-center me-1 hover-dark-circle" title="Create" onClick={() => handleFeatureSoon('Create')} style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}>
            <i className="bi bi-camera-video text-white" style={{ fontSize: '20px' }}></i>
          </div>
          <div className="d-flex align-items-center justify-content-center me-2 hover-dark-circle" title="Notifications" onClick={() => handleFeatureSoon('Notifications')} style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}>
            <i className="bi bi-bell text-white" style={{ fontSize: '20px' }}></i>
          </div>
        </div>
        <Link to="/profile">
           <img src="https://via.placeholder.com/32" alt="Profile" className="rounded-circle" style={{ width: '32px', height: '32px', cursor: 'pointer' }} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
