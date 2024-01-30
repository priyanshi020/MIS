import React from 'react';
import Sidebar from '../components/Sidebar';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Policy1 = () => {
  const location = useLocation();
  const { title, content } = location.state || {};

  // Split content into an array of items
  const contentItems = content ? content.split('\n') : [];

  return (
    <>
      <Sidebar />
      <main style={{ backgroundColor: '#F0F5FD' }}>
        <div className='p-5'>
          {/* Back button with icon */}
          <div className='d-flex '>
          <Link to='/company-policy' className='text-decoration-none'>
            {/* <FontAwesomeIcon icon={faArrowLeft} className='mr-2 ' /> */}
          <img src='/assets/BACK-ARROW.png' className='mr-2'  style={{
            //   position: "absolute",
              marginTop:'3px',
              background: "rgb(211, 211, 211)",
              padding: "6px",
              height: "29px",
              width: "29px",
              borderRadius: "65%", // Border radius for a circular shape
            }}/>
          </Link>
          <h3 className='pb-3'>{title || 'Policy'}</h3>
          </div>
          {/* Map through content items and render each in a new line with bottom margin */}
          {contentItems.map((item, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              {item}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Policy1;
