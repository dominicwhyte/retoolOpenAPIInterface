/**
 *
 * WithNavBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'shards-react';

import getHeaderNavbarItems from './navBarTabs';
import HeaderNavbar from '../HeaderNavbar';
import MainNavbar from '../MainNavbar/MainNavbar';

import PageTitle from '../PageTitle';

function WithNavBar({ title, subtitle, children }) {
  return (
    <Container fluid className="icon-sidebar-nav">
      <Row>
        <Col tag="main" className="main-content p-0" lg="12" md="12" sm="12">
          <MainNavbar layout="HEADER_NAVIGATION" />
          <HeaderNavbar items={getHeaderNavbarItems()} />
          <Container className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
              <PageTitle
                title={title}
                subtitle={subtitle}
                className="text-sm-left mb-3"
              />
            </Row>
            {children}
          </Container>
        </Col>
      </Row>

      <Row />
    </Container>
  );
}

WithNavBar.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default WithNavBar;
