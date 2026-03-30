import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  if (video.type !== 'video' && video.type !== 'shorts') return null;

  const videoId = video.videoId;
  const thumbnail = video.thumbnail && video.thumbnail[video.thumbnail.length - 1]?.url;
  const title = video.title;
  const channelTitle = video.channelTitle;
  const viewCount = video.viewCount || video.viewCountText;
  const publishedTimeText = video.publishedTimeText;
  const channelThumbnail = video.channelThumbnail?.[0]?.url || video.channelAvatar?.[0]?.url || video.author?.avatar?.[0]?.url;
  const lengthText = video.lengthText;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-xl-3 mb-4 video p-2">
      <div className="card border-0 bg-transparent flex-column h-100" style={{ width: '100%' }}>
        <Link to={`/video/${videoId}`} className="text-decoration-none position-relative bg-secondary bg-opacity-10" style={{ borderRadius: '12px' }}>
          <img
            src={thumbnail || 'https://via.placeholder.com/320x180?text=No+Thumbnail'}
            className="card-img-top"
            alt={title}
            style={{ objectFit: 'cover', height: '200px', borderRadius: '12px' }}
          />
          {lengthText && (
            <span 
              className="position-absolute bottom-0 end-0 bg-black text-white px-1 mb-1 me-1" 
              style={{ fontSize: '12px', borderRadius: '4px', fontWeight: '500' }}
            >
              {lengthText}
            </span>
          )}
        </Link>
        <div className="d-flex mt-3">
          <div className="me-3">
            <Link to={`/channel/${video.channelId}`}>
              <img
                src={channelThumbnail || 'https://via.placeholder.com/36'}
                className="rounded-circle bg-secondary bg-opacity-25"
                alt={channelTitle}
                style={{ width: '36px', height: '36px', objectFit: 'cover' }}
              />
            </Link>
          </div>
          <div className="d-flex flex-column pe-3">
            <Link to={`/video/${videoId}`} className="text-decoration-none text-light mb-1">
              <span className="card-title m-0 line-clamp-2" style={{ fontSize: '16px', fontWeight: '500', lineHeight: '1.4' }}>
                {title}
              </span>
            </Link>
            <Link to={`/channel/${video.channelId}`} className="text-decoration-none text-white-50">
              <div className="d-flex align-items-center hover-text-white" style={{ fontSize: '14px' }}>
                {channelTitle}
                <i className="bi bi-check-circle-fill ms-1" style={{ fontSize: '10px', color: '#aaaaaa' }}></i>
              </div>
            </Link>
            <p className="text-white-50 m-0" style={{ fontSize: '14px' }}>
              {viewCount} views • {publishedTimeText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
