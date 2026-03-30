import React from 'react';
import { Link } from 'react-router-dom';

const ShortCard = ({ short, height = '450px' }) => {
  return (
    <div className="card bg-transparent border-0 mb-4 text-center position-relative w-100 h-100">
      <Link to={`/video/${short.videoId}`} className="d-block h-100">
        <img 
          src={short.thumbnail?.[1]?.url || short.thumbnail?.[0]?.url || 'https://via.placeholder.com/400x600'} 
          alt={short.title} 
          className="w-100 rounded-4" 
          style={{ height: height, objectFit: 'cover' }} 
        />
        <div className="position-absolute bottom-0 start-0 p-3 text-start w-100 text-white rounded-bottom-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
          <h5 className="fw-bold mb-1 text-truncate" style={{ fontSize: '1rem' }}>{short.title}</h5>
          <p className="small m-0 text-white-50">{short.viewCountText}</p>
        </div>
      </Link>
      <div className="position-absolute end-0 bottom-0 d-flex flex-column p-2 mb-4 me-n2 z-1">
         <button className="btn bg-dark bg-opacity-75 text-white rounded-circle mb-2 border-0 d-flex align-items-center justify-content-center shadow" style={{ width: '44px', height: '44px' }}><i className="fa fa-thumbs-up"></i></button>
         <button className="btn bg-dark bg-opacity-75 text-white rounded-circle mb-2 border-0 d-flex align-items-center justify-content-center shadow" style={{ width: '44px', height: '44px' }}><i className="fa fa-thumbs-down"></i></button>
         <button className="btn bg-dark bg-opacity-75 text-white rounded-circle border-0 d-flex align-items-center justify-content-center shadow" style={{ width: '44px', height: '44px' }}><i className="fa fa-share"></i></button>
      </div>
    </div>
  );
};

export default ShortCard;
