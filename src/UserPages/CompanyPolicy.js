import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Sidebar1 from '../components/Sidebar1';
import axios from 'axios';

const FixedHeightCard = ({ title, content, onClick }) => {
    const shortenedDescription = content.split(' ').slice(0, 37).join(' ');
  
    return (
      <Card style={{ padding: '20px', height: '400px', overflow: 'hidden' }}>
        <CardMedia>
          <img src='/assets/payroll/ic-calender.png' alt='icon' className='mr-2' />
        </CardMedia>
        <div className='mt-3'>
          <h4>{title}</h4>
        </div>
        <div className='text-secondary '>
          <p className='m-3 ' >{shortenedDescription}...</p>
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
          onClick={onClick}
        >
          Read More
        </Button>
      </Card>
    );
  };
  
const CompanyPolicy = () => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
   
    axios.get('http://localhost:8080/bytesfarms/policy/get?id=0')
      .then(response => {
        setCardsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  const handleReadMoreClick = (id) => {
    axios
      .post(`http://localhost:8080/bytesfarms/policy/create/pdf?id=${id}`, {
        responseType: 'arraybuffer', // Specify the response type as arraybuffer
      })
      .then(response => {
        // Create a Blob from the binary data
        const blob = new Blob([response.data], { type: 'application/pdf' });
  
        // Generate a URL for the Blob
        const url = URL.createObjectURL(blob);
  
        // Open the PDF in a new window
        window.open(url, '_blank');
      })
      .catch(error => {
        console.error('Error fetching PDF:', error);
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
              {cardsData.map(card => (
                <div key={card.id} className="col-md-4 p-2">
                  <FixedHeightCard
                    title={card.title}
                    content={card.content}
                    onClick={() => handleReadMoreClick(card.id)}
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
