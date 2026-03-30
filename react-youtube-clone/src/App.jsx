import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Details from './pages/Details';
import SearchFeed from './pages/SearchFeed';
import Profile from './pages/Profile';
import Shorts from './pages/Shorts';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className="bg-black text-light min-vh-100 d-flex flex-column position-relative">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="d-flex flex-grow-1 overflow-hidden position-relative" style={{ height: 'calc(100vh - 56px)' }}>
          
          {/* Desktop/Tablet Sidebar (usually visible, toggles display) */}
          {isSidebarOpen && (
            <div className="d-none d-lg-block h-100 overflow-auto sidebar-container" style={{ width: '240px', flexShrink: 0 }}>
              <Sidebar />
            </div>
          )}

          {/* Mobile Overlay Sidebar */}
          {isSidebarOpen && (
            <div className="d-lg-none position-fixed top-0 start-0 h-100 w-100 bg-black bg-opacity-75" style={{ zIndex: 1050 }} onClick={toggleSidebar}>
               <div className="bg-black h-100 overflow-auto" style={{ width: '240px' }} onClick={e => e.stopPropagation()}>
                 <div className="ps-3 pe-2 d-flex align-items-center mb-2" style={{ height: '56px' }}>
                    <div className="d-flex align-items-center justify-content-center me-3 hover-dark-circle" style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }} onClick={toggleSidebar}>
                      <i className="bi bi-list text-light" style={{ fontSize: '24px' }}></i>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-play-btn-fill text-danger me-2" style={{ fontSize: '26px' }}></i>
                      <span className="text-white fw-bolder" style={{ fontSize: '20px', letterSpacing: '-0.5px' }}>StreamHub</span>
                    </div>
                 </div>
                 <Sidebar />
               </div>
            </div>
          )}

          <div className="h-100 overflow-auto w-100 main-content">
            <Routes>
              <Route path="/" element={<Home defaultType="home" />} />
              <Route path="/trending" element={<Home defaultType="trending" />} />
              <Route path="/search/:searchTerm" element={<SearchFeed />} />
              <Route path="/category/:categoryId" element={<Home defaultType="search" />} />
              <Route path="/video/:videoId" element={<Details />} />
              <Route path="/channel/:channelId" element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/history" element={<SearchFeed customSearch="Recently watched" />} />
              <Route path="/shorts/:channelId" element={<Shorts />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
