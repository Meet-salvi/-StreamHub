import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../api';
import VideoCard from '../components/VideoCard';
import { useParams, useNavigate } from 'react-router-dom';

const categories = [
  "All", "Gaming", "Music", "Live", "Mixes", "News", "Computer programming",
  "Podcasts", "Trailers", "Cooking", "Gadgets", "Esports", "Recent"
];

const Home = ({ defaultType = 'home' }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(categories[0]);
  
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) setActiveTab(categoryId.charAt(0).toUpperCase() + categoryId.slice(1));
  }, [categoryId]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const query = activeTab === "All" && !categoryId 
       ? `search?query=New+videos&geo=IN` 
       : `search?query=${activeTab !== "All" ? activeTab : categoryId}&geo=IN`;

    fetchFromAPI(query)
      .then((data) => {
        setVideos(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch videos");
        setLoading(false);
      });
  }, [activeTab, categoryId, defaultType]);

  const handleTabClick = (cat) => {
    if (cat !== activeTab) {
      if (cat === "All") navigate("/");
      else navigate(`/category/${cat.toLowerCase()}`);
      setActiveTab(cat);
    }
  };

  return (
    <div className="container-fluid py-3 px-3 w-100 h-100 bg-black">
      {/* Scrollable Categories Header */}
      <div className="d-flex overflow-x-auto pb-3 mb-2 px-1 webkit-scrollbar-hide" style={{ gap: '12px' }}>
        {categoryId || defaultType === "home" ? categories.map((cat, i) => (
          <button 
             key={i} 
             onClick={() => handleTabClick(cat)}
             className="btn text-nowrap border-0"
             style={{
               backgroundColor: activeTab === cat ? '#f1f1f1' : 'rgba(255, 255, 255, 0.1)',
               color: activeTab === cat ? '#0f0f0f' : '#f1f1f1',
               borderRadius: '8px',
               fontWeight: '500',
               fontSize: '14px',
               padding: '4px 12px'
             }}
          >
            {cat}
          </button>
        )) : null}
      </div>

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
           <div className="spinner-border text-danger" role="status"></div>
        </div>
      ) : error ? (
        <div className="alert alert-danger mx-auto mt-5" style={{ maxWidth: '400px' }} role="alert">
          {error}
        </div>
      ) : (
        <div className="row g-x-4">
          {videos.map((item, idx) => (
            <VideoCard video={item} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
