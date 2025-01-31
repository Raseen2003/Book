import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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

    // Listen for the custom event
    window.addEventListener('userLogin', handleUserLogin);

    // Clean up the event listener
    return () => {
      window.removeEventListener('userLogin', handleUserLogin);
    };
  }, []);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/home">BOOK MY ROOM</Navbar.Brand>
          {username && (
            <Nav className="me-1">
              <i className="fa-solid fa-user mt-2"></i>
              <NavDropdown title={username} id="collapsible-nav-dropdown">
                <Link style={{ textDecoration: 'none' }} to={'/bookings'}>
                  <NavDropdown.Item href="#action/3.1">MY BOOKINGS</NavDropdown.Item>
                </Link>
               
                <Link style={{ textDecoration: 'none' }} to={'/login'}>
                  <NavDropdown.Item href="#action/3.3">LOGOUT</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
