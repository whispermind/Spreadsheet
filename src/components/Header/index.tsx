import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "./index.css"

export const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/" className="nav-link">Home</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};