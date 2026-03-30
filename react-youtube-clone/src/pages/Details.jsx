import React, { useEffect, useState } from 'react';
import { fetchAltAPI, fetchFromAPI, fetchSearchAPI } from '../api';
import { useParams, Link } from 'react-router-dom';
import YouTube from 'react-youtube';

const Details = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [channelAvatar, setChannelAvatar] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { videoId } = useParams();

  useEffect(() => {
    setLoading(true);

    const fetchDetails = async () => {
      try {
        const detailsData = await fetchAltAPI(`video/info?id=${videoId}`);
        setVideoDetail(detailsData);
        
        if (detailsData?.channelId) {
           fetchAltAPI(`channel/about?id=${detailsData.channelId}`)
             .then(cData => {
                if (cData && cData.avatar && cData.avatar[0]) {
                   setChannelAvatar(cData.avatar[0].url);
                }
             })
             .catch(e => console.error("Channel fetch fail", e));
        }
        
        try {
          const commentsData = await fetchSearchAPI(`comments?id=${videoId}`);
          setComments(commentsData.data || []);
        } catch(e) { console.error("Comments fail", e) }

        try {
          const relatedData = await fetchFromAPI(`related?id=${videoId}`);
          setRelatedVideos(relatedData.data || []);
        } catch(e) { console.error("Related fail", e) }

      } catch (error) {
        console.error("Error fetching video details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [videoId]);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-danger" role="status"></div></div>;
  if (!videoDetail) return <div className="text-center text-white mt-5">Failed to load video details. Check API keys.</div>;

  const { title, channelId, channelTitle, viewCount, description } = videoDetail;
  const channelImg = channelAvatar || 'https://via.placeholder.com/50';

  const handleActionClick = (action) => {
    alert(`${action} functionality coming soon!`);
  };

  const opts = {
    height: '500',
    width: '100%',
    playerVars: { autoplay: 1 },
  };

  return (
    <div className="container-fluid pt-4 text-light p-md-4">
      <div className="row">
        <div className="col-lg-8">
          <YouTube videoId={videoId} opts={opts} className="w-100" />
          <h4 className="mt-3" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{title}</h4>
          
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex align-items-center">
              <Link to={`/channel/${channelId}`} className="text-decoration-none text-light d-flex align-items-center">
                <img src={channelImg || 'https://via.placeholder.com/40'} alt={channelTitle} className="rounded-circle me-3" style={{ height: '50px', width: '50px' }} />
                <b className="fs-5 me-2">{channelTitle}</b>
                <span className="fa fa-check-circle text-secondary fs-6 me-4"></span>
              </Link>
              <button className="btn-light p-2 rounded-pill button1 fw-bold px-3" onClick={() => handleActionClick('Subscribe')}>Subscribe</button>
            </div>
            
            <div className="d-flex">
              <button className="button3 fa fa-thumbs-o-up" onClick={() => handleActionClick('Like')}>
                <span className="fa fa-thumbs-o-down ms-3 border-start ps-3 border-secondary" onClick={(e) => { e.stopPropagation(); handleActionClick('Dislike'); }}></span>
              </button>
              <button className="button3 text-light" onClick={() => handleActionClick('Share')}><i className="bi bi-share me-1"></i>Share</button>
              <button className="button3 text-light" onClick={() => handleActionClick('Download')}><i className="bi bi-download me-1"></i>Download</button>
            </div>
          </div>
          
          <div className="description mt-4 p-3 rounded" style={{ backgroundColor: '#272727', cursor: 'pointer' }}>
            <b>{parseInt(viewCount).toLocaleString()} views</b>
            <p className="mt-2 text-wrap text-white-50" style={{ whiteSpace: 'pre-line' }}>{description?.slice(0, 200)}...</p>
          </div>

          <div className="comments-section mt-4 d-none d-lg-block">
            <h5 className="mb-4">{comments.length > 0 ? comments.length : '0'} Comments</h5>
            {comments.slice(0, 10).map((c, i) => (
              <div key={i} className="d-flex mb-4">
                <img src={c.authorThumbnail?.[0]?.url || 'https://via.placeholder.com/40'} className="rounded-circle me-3 mt-1" style={{ height: '40px', width: '40px' }} />
                <div>
                  <b className="fs-6 me-2">{c.authorText}</b> <span className="text-secondary small">{c.publishedTimeText}</span>
                  <p className="mt-1 mb-1">{c.textDisplay}</p>
                  <div className="text-secondary small align-items-center d-flex">
                    <i className="bi bi-hand-thumbs-up me-1"></i> {c.likesCount} <i className="bi bi-hand-thumbs-down ms-3 me-3"></i> Reply
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4 px-3 mt-4 mt-lg-0">
          <h5 className="mb-3 ps-2">Related Videos</h5>
          {relatedVideos.map((item, idx) => {
            if (item.type !== 'video') return null;
            return (
              <Link to={`/video/${item.videoId}`} key={idx} className="text-decoration-none">
                <div className="d-flex mb-3">
                  <img src={item.thumbnail?.[1]?.url} className="rounded me-2" style={{ height: '94px', width: '168px', objectFit: 'cover' }} />
                  <div className="text-light ms-1" style={{ overflow: 'hidden' }}>
                    <h6 className="mb-1" style={{ fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</h6>
                    <p className="text-secondary mb-0" style={{ fontSize: '0.8rem' }}>{item.channelTitle}</p>
                    <p className="text-secondary m-0" style={{ fontSize: '0.8rem' }}>{item.publishedTimeText}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Details;
