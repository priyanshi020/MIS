import React from 'react';
import Sidebar1 from '../components/Sidebar1';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Policy = () => {
  const location = useLocation();
  const { title, content } = location.state || {};

  // Split content into an array of items
  const contentItems = content ? content.split('\n') : [];

  return (
    <>
      <Sidebar1 />
      <main style={{ backgroundColor: '#F0F5FD' }}>
        <div className='p-5'>
          {/* Back button with icon */}
          <div className='d-flex '>
          <Link to='/user-company-policy' className='text-decoration-none'>
            <FontAwesomeIcon icon={faArrowLeft} className='mr-2 ' />
          
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

export default Policy;
