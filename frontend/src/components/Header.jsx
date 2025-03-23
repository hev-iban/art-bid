import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  // Function to check if the token is expired
  function isTokenExpired(token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
      return decoded.exp * 1000 < Date.now(); // Return true if the token has expired
    } catch (e) {
      return true; // If decoding fails, treat it as expired
    }
  }

  // Retrieve token from localStorage
  const token = localStorage.getItem('authToken');
  const isAuthenticated = token && !isTokenExpired(token); // Check if token is valid

  const handleLogout = () => {
    console.log('Logout initiated'); // Debug log
    try {
      localStorage.removeItem('authToken'); // Remove token on logout
      console.log('Token removed from localStorage'); // Debug log
    } catch (error) {
      console.error('Error during logout', error);
    }
    console.log('Redirecting to /auth'); // Debug log
    navigate('/auth'); // Redirect to AuthScreen
  };

  // Automatically log out if token is expired
  if (!isAuthenticated && token) {
    console.log('Token expired, logging out...'); // Debug log
    handleLogout();
  }

  return (
    <Navbar expand="lg" className="bg-black">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" style={{ color: 'white' }}>
          PinoyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={NavLink} to="/" style={{ color: 'white' }}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/profile" style={{ color: 'white' }}>
              Profile
            </Nav.Link>

            {/* Logout Button */}
            <Nav.Link onClick={handleLogout} style={{ color: 'white', cursor: 'pointer' }}>
              Logout
            </Nav.Link>
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;