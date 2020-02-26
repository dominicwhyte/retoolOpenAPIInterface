/**
 *
 * TagEndpointsGroup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  ListGroupItemHeading,
  Col,
  ListGroupItem,
  ListGroup,
  Badge,
} from 'shards-react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function endpointTypeToTheme(type) {
  switch (type) {
    case 'get':
      return 'primary';
    case 'post':
      return 'success';
    case 'delete':
      return 'danger';
    case 'put':
      return 'warning';
    default:
      return 'secondary';
  }
}

function TagEndpointsGroup({ paths, tag, onEndpointPressed }) {
  const endpoints = [];
  Object.keys(paths).forEach(function _(path) {
    const subPaths = paths[path];
    Object.keys(subPaths).forEach(function __(subPath) {
      const subPathDetails = subPaths[subPath];
      if (subPathDetails.tags.includes(tag.name)) {
        endpoints.push({
          path,
          type: subPath,
          subPathDetails,
        });
      }
    });
  });
  console.log('endpoints', endpoints);

  return (
    <div>
      <ListGroup>
        <ListGroupItem>
          <h4 className="m-0">{tag.name}</h4>
          <h6 className="m-0">{tag.description}</h6>
        </ListGroupItem>
        {endpoints.map((endpoint, idx) => (
          <ListGroupItem
            action
            key={idx}
            onClick={() => {
              onEndpointPressed(endpoint);
            }}
          >
            <Row className="px-3">
              <Col lg="12" sm="1" className="user-teams__image my-auto p-0">
                <Badge outline theme={endpointTypeToTheme(endpoint.type)}>
                  {endpoint.type.toUpperCase()}
                </Badge>
              </Col>

              {/* <img className="rounded" src={team.image} alt={team.name} /> */}

              <Col className="user-teams__info pl-3">
                <h6 className="m-0">{endpoint.path}</h6>
                <h6 className="text-light">
                  {endpoint.subPathDetails.summary}
                </h6>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

TagEndpointsGroup.propTypes = {
  onEndpointPressed: PropTypes.func,
  tag: PropTypes.object,
  paths: PropTypes.object,
};

export default TagEndpointsGroup;
