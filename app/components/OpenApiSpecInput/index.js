/**
 *
 * OpenApiSpecInput
 *
 */

import React, { useEffect, useState } from 'react';
import { FaUsers, FaSignOutAlt } from 'react-icons/fa';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  FormInput,
  Modal,
  ModalBody,
  ModalHeader,
  ListGroup,
  ListGroupItem,
  ModalFooter,
  Form,
  FormTextarea,
  Button,
  Row,
  Col,
} from 'shards-react';

function OpenApiSpecInput({ onConfirm, specs, api }) {
  const [specsText, setSpecsText] = React.useState('');
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Row className="mt-4">
        <Col lg="6" sm="12">
          <Card small className="mb-4 pt-3">
            <CardHeader className="border-bottom text-center">
              <h4 className="mb-0">{api ? api.info.title : ''}</h4>
              <span className="text-muted d-block mb-2">
                {api ? api.info.version : ''}
              </span>
              <Button
                pill
                outline
                size="sm"
                className="mb-2"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Edit
              </Button>
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem className="p-4">
                <strong className="text-muted d-block mb-2">
                  OpenAPI Specification URL
                </strong>
                <span>{specs}</span>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        <Col lg="6" />
      </Row>

      <Modal open={open} toggle={() => setOpen(!open)}>
        <ModalHeader> 👋 Provide your OpenAPI Specification (URL)</ModalHeader>
        <ModalBody>
          <Form>
            <FormInput
              placeholder="Enter URL"
              required
              onChange={event => {
                setSpecsText(event.target.value);
              }}
            />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            theme="secondary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              onConfirm(specsText);
            }}
          >
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

OpenApiSpecInput.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  specs: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  api: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default OpenApiSpecInput;
