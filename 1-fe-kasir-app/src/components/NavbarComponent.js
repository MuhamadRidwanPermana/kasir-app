import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Pesanan, DaftarMenus, Categories } from '../pages'

export default function NavbarComponent() {
  return (
    <Navbar expand="lg" className="border-bottom bg-white">
      <Container fluid>
        <Nav className="m-auto">
          <Navbar.Brand>
            <Link to="/" className='fw-bold'>Kasir App</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link>
                <Link to="/daftar-menu" element={<DaftarMenus />}>Daftar Menu</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/category" element={<Categories />}>Category</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/pesanan" element={<Pesanan />}>Pesanan</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  )
}
