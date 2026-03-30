import React, { useEffect, useState } from 'react';
import { fetchAltAPI, fetchFromAPI } from '../api';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import ShortCard from '../components/ShortCard';
import Shorts from './Shorts';

const Profile = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Home');
  const params = useParams();
  const channelId = params.channelId || 'UCMhe8jmac-tWKU0Vj_OXDvA';

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const data = await fetchAltAPI(`channel/about?id=${channelId}`);
        setChannelDetail(data);
      } catch (err) {
        console.error("Error fetching channel details", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [channelId]);

  useEffect(() => {
    // If the active tab is Shorts, let the embedded Shorts component handle its own data fetching
    if (activeTab === 'Shorts') return;

    const fetchTabContent = async () => {
      setTabLoading(true);
      try {
        let endpoint = 'channel/videos';
        if (activeTab === 'Live') endpoint = 'channel/live';
        else if (activeTab === 'Community') endpoint = 'channel/community';
        else if (activeTab === 'Home') endpoint = 'channel/videos';
        
        const vids = await fetchFromAPI(`${endpoint}?id=${channelId}`);
        setVideos(vids.data || []);
      } catch(e) {
        console.error("Could not fetch tab content", e);
        setVideos([]);
      } finally {
        setTabLoading(false);
      }
    };
    
    fetchTabContent();
  }, [channelId, activeTab]);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-danger"></div></div>;
  if (error || !channelDetail) return <div className="alert alert-danger mx-auto mt-5 w-50 text-center">{error || "Profile not found"}</div>;

  const { title, avatar, banner, channelHandle, subscriberCountText, videosCountText, description } = channelDetail;

  const tabs = ['Home', 'Videos', 'Shorts', 'Live', 'Community'];

  return (
    <div className="container-fluid p-0 text-light bg-black">
      {banner && banner[0] && (
        <img src={banner[0].url} alt="Banner" className="w-100 object-cover" style={{ height: '200px', objectFit: 'cover' }} />
      )}
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-md-3 text-center mb-4">
            <img src={avatar?.[0]?.url || 'https://via.placeholder.com/150'} alt={title} className="rounded-circle" style={{ width: '150px', height: '150px' }} />
          </div>
          <div className="col-12 col-md-9 text-center text-md-start">
            <h2 className="fw-bold mb-1">{title} <span className="fa fa-check-circle" style={{ fontSize: '1rem' }}></span></h2>
            <p className="text-secondary mb-2">
              {channelHandle} • {subscriberCountText} • {videosCountText}
            </p>
            <p className="text-light text-opacity-75" style={{ fontSize: '0.9rem', maxWidth: '800px' }}>
              {description?.slice(0, 150)}...
            </p>
            <button className="btn-light p-2 rounded-pill px-4 fw-bold mt-2">Subscribe</button>
          </div>
        </div>

        <div className="mt-5 border-bottom border-secondary mb-4 pb-2">
          <ul className="nav nav-tabs border-0" style={{ fontSize: '1rem', fontWeight: '500' }}>
            {tabs.map(tab => (
              <li className="nav-item" key={tab} style={{ cursor: 'pointer' }}>
                <span 
                  className={`nav-link border-0 ${activeTab === tab ? 'active text-light bg-transparent border-bottom border-light rounded-0' : 'text-secondary'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="row">
          <h5 className="mb-4 fw-bold ps-3">{activeTab}</h5>
          
          {activeTab === 'Shorts' ? (
             <Shorts channelIdProp={channelId} />
          ) : tabLoading ? (
            <div className="text-center mt-3"><div className="spinner-border text-secondary p-2"></div></div>
          ) : (
            <>
              {videos.map((item, idx) => (
                <VideoCard video={item} key={idx} />
              ))}
              {videos.length === 0 && <p className="text-secondary text-center mt-4">No content found or API rate limit exceeded.</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
