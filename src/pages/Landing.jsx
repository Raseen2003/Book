import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const backgroundImage = 'url("https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600")'; // Replace with your background image URL

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
          <h1 style={{color:'red',fontWeight:'600'}}>BOOK MY ROOM</h1>
          <h5
            style={{ fontSize: '18px', alignItems: 'center',color:'black',fontWeight:'800' }}
            className="d-flex justify-content-center align-items-center"
          >
            OUR BOSS IS OUR GUESTS.
          </h5>
          <Link
            to="/register"
            className="btn btn-danger d-flex justify-content-center align-items-center"
          >
            GET STARTED
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landing;
