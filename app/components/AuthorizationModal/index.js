/**
 *
 * AuthorizationModal
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  ModalFooter,
  Form,
  FormInput,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
} from 'shards-react';

// credentials are current authorized credentials
function AuthorizationModal({
  credentials,
  title,
  currentSecurityDefinition,
  setCurrentSecurityDefinition, // to open/close modal. We don't edit the security definition
  dispatchSetCredentials,
}) {
  const [newCredentials, setNewCredentials] = useState(false);

  const credentialIsAuthorized = !!credentials[currentSecurityDefinition.name];

  useEffect(() => {
    setNewCredentials(false);
  }, [credentialIsAuthorized]);

  function componentForSecurityComponent(securityDefinition) {
    switch (securityDefinition.type) {
      case 'apiKey':
        if (securityDefinition.in === 'header') {
          const valueIfUnauthorized = newCredentials
            ? newCredentials.value
            : '';
          const formValue = credentialIsAuthorized
            ? '************'
            : valueIfUnauthorized;
          return (
            <Form>
              <label htmlFor="value">Value</label>
              <FormInput
                id="value"
                placeholder="Enter Value"
                required
                disabled={credentialIsAuthorized}
                value={formValue}
                onChange={event => {
                  setNewCredentials({
                    ...securityDefinition,
                    value: event.target.value,
                  });
                }}
              />
            </Form>
          );
        }
        return null;
      default:
        return null;
    }
  }

  return (
    <Modal
      open={!!currentSecurityDefinition}
      toggle={() => setCurrentSecurityDefinition(!currentSecurityDefinition)}
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        {componentForSecurityComponent(currentSecurityDefinition)}
      </ModalBody>
      <ModalFooter>
        <Button
          theme="secondary"
          onClick={() => {
            setCurrentSecurityDefinition(false);
          }}
        >
          Close
        </Button>
        {credentialIsAuthorized ? (
          <Button
            theme="danger"
            onClick={() => {
              dispatchSetCredentials(undefined, currentSecurityDefinition.name);
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            theme="success"
            disabled={!newCredentials}
            onClick={() => {
              dispatchSetCredentials(
                newCredentials,
                currentSecurityDefinition.name,
              );
            }}
          >
            Authorize
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
}

AuthorizationModal.propTypes = {};

export default AuthorizationModal;
