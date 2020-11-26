import React from 'react';
import PropTypes from 'prop-types';

// Boostrap components
import {
  Navbar, Nav, NavDropdown
} from 'react-bootstrap';

// Constant
import { WEATHER_UNITS } from '../../config';

// Components
import { Search } from '../../components';

export const Header = ({
  unit, setUnit, setCoordinates, initialValues
}) => (
  <Navbar bg="info" variant="dark" expand="lg">
    <Navbar.Brand className="text-white">Weather App</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavDropdown title={unit} className="text-capitalize">
          {
            WEATHER_UNITS.map(item => (
              <NavDropdown.Item
                key={item}
                active={item === unit}
                onClick={() => { setUnit(item); }}
              >
                {item}
              </NavDropdown.Item>
            ))
          }
        </NavDropdown>
      </Nav>
      <Search
        setCoordinates={setCoordinates}
        initialValues={initialValues}
      />
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  unit: PropTypes.string.isRequired,
  setUnit: PropTypes.func.isRequired,
  setCoordinates: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired
};
