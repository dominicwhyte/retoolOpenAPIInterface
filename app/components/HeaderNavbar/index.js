/**
 *
 * MainSidebar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Container, Row, Col, Nav, Collapse } from 'shards-react';
import MenuItem from './MenuItem';
// import messages from './messages';

function HeaderNavbar(props) {
  // Note: I added props arg

  const { items } = props;

  return (
    <Collapse className="header-navbar d-lg-flex p-0 bg-white border-top" open>
      <Container>
        <Row>
          <Col>
            <Nav tabs className="border-0 flex-column flex-lg-row">
              {items.map((item, idx) => (
                <MenuItem key={idx} item={item} />
              ))}
            </Nav>
          </Col>
        </Row>
      </Container>
    </Collapse>
  );
}

HeaderNavbar.propTypes = {
  items: PropTypes.array,
};

export default HeaderNavbar;
