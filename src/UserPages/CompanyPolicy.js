import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Sidebar1 from '../components/Sidebar1';
import axios from 'axios';

const FixedHeightCard = ({ title, content, onClickReadMore, isExpanded }) => {
  const shortenedDescription = content.split(' ').slice(0, 37).join(' ');

  return (
    <Card style={{ padding: '20px',  overflow: 'hidden' }}>
      <CardMedia>
        <img src='/assets/payroll/ic-calender.png' alt='icon' className='mr-2' />
      </CardMedia>
      <div className='mt-3'>
        <h4>{title}</h4>
      </div>
      <div className='text-secondary' style={{  minHeight:'150px', overflow: 'hidden' }}>
        <p className='m-3'>{isExpanded ? content : shortenedDescription}...</p>
      </div>
      <Button
        variant="contained"
        style={{
          fontWeight: 600,
          fontSize: "15px",
          color: "white",
          background: "#1B1A47",
          borderRadius: "30px",
          marginTop: "12px",
        }}
        onClick={onClickReadMore}
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </Button>
    </Card>
  );
};

const CompanyPolicy = () => {
  const [cardsData, setCardsData] = useState([]);
  const [expandedCards, setExpandedCards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/bytesfarms/policy/get?id=0')
      .then(response => {
        setCardsData(response.data);
        // Initialize the expanded state for each card to false
        setExpandedCards(Array(response.data.length).fill(false));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  const handleReadMoreClick = (index) => {
    // Toggle the expanded state for the clicked card
    setExpandedCards(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <>
      <Sidebar1 />
      <main style={{ backgroundColor: "#F0F5FD" }}>
        <div className="p-5">
          <h3 className="pb-3">Company Policy</h3>
          <div className="container">
            <div className="row">
              {cardsData.map((card, index) => (
                <div key={card.id} className="col-md-4 p-2">
                  <FixedHeightCard
                    title={card.title}
                    content={card.content}
                    onClickReadMore={() => handleReadMoreClick(index)}
                    isExpanded={expandedCards[index]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CompanyPolicy;
