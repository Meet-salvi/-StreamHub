import React, { useEffect, useState } from 'react';
import { fetchSearchAPI } from '../api';
import VideoCard from '../components/VideoCard';
import { useParams } from 'react-router-dom';

const SearchFeed = ({ customSearch }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const searchTerm = customSearch || params.searchTerm;

  useEffect(() => {
    setLoading(true);
    fetchSearchAPI(`search?query=${searchTerm}&geo=IN&duration=medium`)
      .then((data) => {
        setVideos(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch search results.");
        setLoading(false);
      });
  }, [searchTerm]);

  return (
    <div className="container-fluid py-4 w-100">
      <h4 className="text-light fw-bold mb-4">
        {customSearch ? (
          <><span className="text-danger me-2"><i className="bi bi-clock-history"></i></span> {customSearch}</>
        ) : (
          <>Search Results for: <span className="text-danger">{searchTerm}</span></>
        )}
      </h4>
      {loading ? (
        <div className="text-center w-100 mt-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger mx-auto mt-5" style={{ maxWidth: '400px' }} role="alert">
          {error}
        </div>
      ) : (
        <div className="row g-3">
          {videos.map((item, idx) => (
            <VideoCard video={item} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFeed;
