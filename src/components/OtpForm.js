import React, { useState, useEffect } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OtpForm = ({ onSuccessVerification, userData }) => {
  const [otp, setOtp] = React.useState('');
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleSubmit = ( e) => {
    e.preventDefault();

   
    const verifyOtpEndpoint = `http://localhost:8080/bytesfarms/user/verifyOTP`;

    const data = {
      ...userData,
    //   otp: otp,
    };

    axios
      .post(verifyOtpEndpoint, data)
      .then((response) => {
       
        console.log('OTP Verified:', response.data);
       
        onSuccessVerification(); 
      })
      .catch((error) => {
        
        console.error('OTP Verification failed:', error.response.data);
       
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  const resendOTP = () => {
    setMinutes(5); // Set the timer to 5 minutes
    setSeconds(0);
  };

  return (
    <>
      <section
        className="gradient-custom pt-5"
        style={{
          backgroundImage: `url(assets/bg.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card text-white shadow shadow-lg"
                style={{ borderRadius: '1rem', backgroundColor: 'white' }}
              >
                <div className="card-body pb-5 text-center">
                  <div className="mt-md-4">
                    <div className="text-center pb-5">
                      <img
                        src="assets/ByteWiseLogo.png"
                        style={{ width: '185px' }}
                        alt="logo"
                      />
                      <h4 className="pt-4 mt-4 text-dark">OTP Verification</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <MuiOtpInput value={otp} onChange={handleChange} />
                      <div className="countdown-text text-dark  m-4 d-flex justify-content-center">
                        {minutes > 0 || seconds > 0 ? (
                          <p>
                            Time Remaining:{' '}
                            {minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                          </p>
                        ) : (
                          <p>Didn't receive the code?</p>
                        )}

                        <p className="small">
                          <Link to="/log" className="text-dark-50 ml-2">
                            Resend OTP
                          </Link>
                        </p>
                      </div>
                      <button
                        className="btn btn-dark btn-lg w-50 mt-3"
                        type="submit"
                        style={{
                          transition: 'background-color 0.3s',
                          backgroundColor: '#1B1A47',
                          color: 'white',
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = 'white';
                          e.target.style.color = '#1B1A47';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = '#1B1A47';
                          e.target.style.color = 'white';
                        }}
                      >
                        Verify
                      </button>{' '}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OtpForm;
