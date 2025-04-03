import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const backgroundImage = 'url("https://e1.pxfuel.com/desktop-wallpaper/910/207/desktop-wallpaper-high-quality-hotel-room-luxury-hotel.jpg")'; // Replace with your background image URL

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          backgroundImage: backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="d-flex justify-content-center align-items-center rounded shadow w-100"
      >
        <div>
          <h1 style={{color:'white',fontWeight:'600'}}>BOOK MY ROOM</h1>
          <h5
            style={{ fontSize: '18px', alignItems: 'center',color:'white',fontWeight:'800' }}
            className="d-flex justify-content-center align-items-center"
          >
            OUR BOSS IS OUR GUESTS.
          </h5>
          <Link
            to="/register"
            className="btn btn-dark d-flex justify-content-center align-items-center"
          >
            GET STARTED
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landing;
