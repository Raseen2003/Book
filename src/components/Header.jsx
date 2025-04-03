import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      const userObj = JSON.parse(user);
      setUsername(userObj.username.split(" ")[0]);
    }

    const handleUserLogin = () => {
      const user = sessionStorage.getItem("user");
      if (user) {
        const userObj = JSON.parse(user);
        setUsername(userObj.username.split(" ")[0]);
      }
    };

    window.addEventListener('userLogin', handleUserLogin);
    return () => {
      window.removeEventListener('userLogin', handleUserLogin);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUsername("");
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand className='text-' as={Link} to="/home">BOOK MY ROOM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {username && (
              <>
               
                <Nav.Link as={Link} to="/bookings" className="text-white me-3">
                  <i className="fa-solid fa-list me-2"></i>
                  MY BOOKINGS
                </Nav.Link>
                <Nav.Link as={Link} to="/bookings" className="text-white me-3">
                  <i className="fa-solid fa-phone me-2"></i>
                  Contact Us
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="text-white me-3">
                  <i className="fa-solid fa-right-from-bracket me-3"></i>
                  LOGOUT
                </Nav.Link>
                <Nav.Item className="text-white me-2">
                  <i className="fa-solid fa-user me-2"></i>
                  {username}
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;