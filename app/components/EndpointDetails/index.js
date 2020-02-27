/**
 *
 * EndpointDetails
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Badge,
  Button,
} from 'shards-react';

function EndpointDetails({ endpoint }) {
  const { responses } = endpoint.subPathDetails;
  return (
    <Card small className="user-details mb-4">
      <CardHeader className="p-4" />
      <CardBody className="p-0">
        <h4 className="text-center m-0 mt-2">
          {endpoint.subPathDetails.summary}
        </h4>

        <p className="text-center text-light m-0 mb-2">
          {`${endpoint.type.toUpperCase()} ${endpoint.path}`}
        </p>
        {/* User Social Icons */}

        {/* User Data */}
        <div className="user-details__user-data border-top border-bottom p-4">
          <Row className="mb-3">
            <Col className="w-50">
              <span>Description</span>
              <span>{endpoint.subPathDetails.description}</span>
            </Col>
            <Col className="w-50">
              <span>Tags</span>
              <span>{endpoint.subPathDetails.tags.join(', ')}</span>
            </Col>
          </Row>
          <Row>
            <Col className="w-50">
              <span>Phone</span>
              <span>test</span>
            </Col>
            <Col className="w-50">
              <span>Account Number</span>
              <span>test</span>
            </Col>
          </Row>
        </div>
        {/* User Tags */}
        <div className="user-details__tags p-4">
          <span>Possible Responses</span>
          <br />
          <br />
          {Object.keys(responses).map((response, idx) => (
            <Button
              key={idx}
              theme="light"
              className="text-light text-uppercase mb-2 border mr-1"
              onClick={() =>
                // TODO: Make this less hacky (i.e. make a UI for showing the responses)
                // eslint-disable-next-line no-alert
                alert(
                  `Description: ${responses[response].description}\n${
                    responses[response].schema
                      ? `Schema: ${JSON.stringify(responses[response].schema)}`
                      : ''
                  }`,
                )
              }
            >
              {response}
            </Button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

EndpointDetails.propTypes = {};

export default EndpointDetails;
