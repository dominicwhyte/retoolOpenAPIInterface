/**
 *
 * AuthorizationCard
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaLock } from 'react-icons/fa';
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  ModalFooter,
  Form,
  FormInput,
  Button,
} from 'shards-react';
import AuthorizationModal from 'components/AuthorizationModal';

function isSecurityDefinitionSupported(securityDefinition) {
  switch (securityDefinition.type) {
    case 'apiKey':
      return securityDefinition.in === 'header';
    default:
      return false;
  }
}
function prettifySecurityDefinition(securityDefinition) {
  if (!securityDefinition) {
    return '';
  }
  const authType = [
    securityDefinition.type,
    securityDefinition.in,
    securityDefinition.flow,
  ]
    .filter(val => val)
    .join(', ');
  return authType;
}

function AuthorizationCard({
  securityDefinitions,
  credentials,
  dispatchSetCredentials,
}) {
  console.log('securityDefinitions', securityDefinitions);
  const [currentSecurityDefinition, setCurrentSecurityDefinition] = useState(
    false,
  );

  return (
    <div>
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Authorization</h6>
        </CardHeader>

        <CardBody className="p-0">
          <ListGroup flush>
            <ListGroupItem className="p-3">
              {Object.keys(securityDefinitions).map(
                (securityDefinitionKey, idx) => {
                  const securityDefinition =
                    securityDefinitions[securityDefinitionKey];

                  return (
                    <span className="d-flex mb-2" key={idx}>
                      <FaLock />
                      <span>&nbsp;</span>
                      <strong className="mr-1">
                        {' '}
                        {securityDefinitionKey}
                      </strong>{' '}
                      ({prettifySecurityDefinition(securityDefinition)}){' '}
                      {isSecurityDefinitionSupported(securityDefinition) ? (
                        <Button
                          pill
                          outline
                          size="sm"
                          className="ml-auto"
                          onClick={() => {
                            setCurrentSecurityDefinition(securityDefinition);
                          }}
                        >
                          Manage
                        </Button>
                      ) : (
                        <span className="ml-auto">Not yet supported</span>
                      )}
                    </span>
                  );
                },
              )}
            </ListGroupItem>
          </ListGroup>
        </CardBody>
        <ModalFooter />
      </Card>
      <AuthorizationModal
        credentials={credentials}
        currentSecurityDefinition={currentSecurityDefinition}
        setCurrentSecurityDefinition={setCurrentSecurityDefinition}
        title={`${currentSecurityDefinition.name} (${prettifySecurityDefinition(
          currentSecurityDefinition,
        )})`}
        dispatchSetCredentials={dispatchSetCredentials}
      />
    </div>
  );
}

AuthorizationCard.propTypes = {
  securityDefinitions: PropTypes.object,
  credentials: PropTypes.object,
};

export default AuthorizationCard;
