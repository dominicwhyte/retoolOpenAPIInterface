import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Container, Navbar, NavbarBrand, Form } from 'shards-react';

import NavbarNav from './NavbarNav/NavbarNav';
import NavbarToggle from './NavbarToggle';

const MainNavbar = ({ layout, stickyTop }) => {
  const isHeaderNav = layout === 'HEADER_NAVIGATION';
  const classes = classNames(
    'main-navbar',
    'bg-white',
    stickyTop && 'sticky-top',
  );

  return (
    <div className={classes}>
      <Container fluid={!isHeaderNav || null} className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
          {isHeaderNav && (
            <NavbarBrand href="#" style={{ lineHeight: '25px' }}>
              <div className="d-table m-auto">
                <img
                  id="main-logo"
                  className="d-inline-block align-top mr-1 ml-3"
                  style={{ maxWidth: '25px' }}
                  src={require('../../images/shards-dashboards-logo.svg')}
                  alt="Shards Dashboard"
                />
                <span className="d-none d-md-inline ml-1">
                  OpenAPI Interface
                </span>
              </div>
            </NavbarBrand>
          )}

          <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex" />
          <NavbarNav />
          <NavbarToggle />
        </Navbar>
      </Container>
    </div>
  );
};

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool,
};

MainNavbar.defaultProps = {
  stickyTop: true,
};

export default MainNavbar;
