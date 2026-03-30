import React, { useEffect, useState, useRef } from 'react';
import { fetchFromAPI } from '../api';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

const ShortPlayer = ({ short }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPlaying(true);
            if (playerRef.current) {
               playerRef.current.playVideo();
            }
          } else {
            setIsPlaying(false);
            if (playerRef.current) {
               playerRef.current.pauseVideo();
            }
          }
        });
      },
      { threshold: 0.7 } // Trigger play when 70% of the video is visible
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePlayerReady = (event) => {
    playerRef.current = event.target;
    if (isMuted) event.target.mute();
    // auto play if it's currently marked as playing (i.e., in view upon loading)
    if (isPlaying) {
      event.target.playVideo();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current?.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current?.playVideo();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (isMuted) {
      playerRef.current?.unMute();
      setIsMuted(false);
    } else {
      playerRef.current?.mute();
      setIsMuted(true);
    }
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      loop: 1,
      playlist: short.videoId, // Enables looping
      fs: 0,
      iv_load_policy: 3,
      disablekb: 1,
      mute: 1
    },
  };

  return (
    <div 
      ref={containerRef} 
      className="w-100 d-flex justify-content-center align-items-center position-relative" 
      style={{ height: 'calc(100vh - 56px)', scrollSnapAlign: 'start', scrollSnapStop: 'always', padding: '10px 0' }}
    >
      <div 
        className="position-relative bg-dark overflow-hidden h-100" 
        style={{ width: '100%', maxWidth: '420px', borderRadius: '16px', cursor: 'pointer', boxShadow: '0px 0px 15px rgba(0,0,0,0.5)' }}
        onClick={togglePlay}
      >
         <div className="w-100 h-100" style={{ pointerEvents: 'none' }}>
           <YouTube 
              videoId={short.videoId} 
              opts={opts} 
              onReady={handlePlayerReady} 
              className="w-100 h-100"
              iframeClassName="w-100 h-100 object-cover" 
              style={{ width: '100%', height: '100%' }}
           />
         </div>
         
         {!isPlaying && (
           <div className="position-absolute top-50 start-50 translate-middle text-white bg-black bg-opacity-50 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', zIndex: 10 }}>
              <i className="fa fa-play fs-1 ms-2"></i>
           </div>
         )}

         {/* Mute Toggle */}
         <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: 10 }}>
            <button onClick={toggleMute} className="btn bg-dark bg-opacity-50 text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backdropFilter: 'blur(5px)' }}>
               {isMuted ? <i className="fa fa-volume-mute fs-5"></i> : <i className="fa fa-volume-up fs-5"></i>}
            </button>
         </div>
         
         {/* Video Info Overlay */}
         <div className="position-absolute bottom-0 start-0 p-3 pb-4 text-start w-100 text-white" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)', zIndex: 5 }}>
            <h5 className="fw-bold mb-1 text-truncate" style={{ fontSize: '1.1rem', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{short.title}</h5>
            <p className="small m-0 text-white-50" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{short.viewCountText}</p>
         </div>
         
         {/* Right Sidebar Interaction Buttons */}
         <div className="position-absolute end-0 bottom-0 d-flex flex-column p-3 mb-4" style={{ zIndex: 10 }}>
            <button onClick={(e) => e.stopPropagation()} className="btn bg-dark bg-opacity-50 text-white rounded-circle mb-3 border-0 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backdropFilter: 'blur(5px)' }}>
               <i className="fa fa-thumbs-up fs-5"></i>
            </button>
            <button onClick={(e) => e.stopPropagation()} className="btn bg-dark bg-opacity-50 text-white rounded-circle mb-3 border-0 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backdropFilter: 'blur(5px)' }}>
               <i className="fa fa-thumbs-down fs-5"></i>
            </button>
            <button onClick={(e) => e.stopPropagation()} className="btn bg-dark bg-opacity-50 text-white rounded-circle mb-3 border-0 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backdropFilter: 'blur(5px)' }}>
               <i className="fa fa-comment fs-5"></i>
            </button>
            <button onClick={(e) => e.stopPropagation()} className="btn bg-dark bg-opacity-50 text-white rounded-circle border-0 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backdropFilter: 'blur(5px)' }}>
               <i className="fa fa-share fs-5"></i>
            </button>
         </div>
      </div>
    </div>
  );
};

const Shorts = ({ channelIdProp }) => {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const channelId = channelIdProp || params.channelId;

  useEffect(() => {
    setLoading(true);
    // If we land on '/shorts' without an ID, fallback to some trending short ID or the default youtube home ID.
    const fetchId = channelId || 'UCMhe8jmac-tWKU0Vj_OXDvA'; 
    fetchFromAPI(`channel/shorts?id=${fetchId}`)
      .then((data) => {
        setShorts(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [channelId]);

  return (
    <div className="container-fluid p-0 bg-black text-light position-relative">
      <style>{`
        .shorts-feed-container::-webkit-scrollbar { 
            display: none; 
        }
        .object-cover { 
            object-fit: cover !important; 
        }
      `}</style>
      
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 56px)' }}>
           <div className="spinner-border text-danger" style={{ width: '3rem', height: '3rem' }}></div>
        </div>
      ) : (
        <div 
          className="shorts-feed-container w-100" 
          style={{ 
            height: 'calc(100vh - 56px)', 
            overflowY: 'scroll', 
            scrollSnapType: 'y mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {shorts.length > 0 ? (
            shorts.map((short, idx) => (
              <ShortPlayer key={idx} short={short} />
            ))
          ) : (
             <div className="alert alert-secondary text-center mt-5 w-50 mx-auto">No shorts found for this channel or API rate limited.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Shorts;
