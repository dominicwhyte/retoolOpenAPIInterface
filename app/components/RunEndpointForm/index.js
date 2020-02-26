/**
 *
 * RunEndpointForm
 *
 */

import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Card,
  CardHeader,
  Button,
} from 'shards-react';

import PropTypes from 'prop-types';
// import styled from 'styled-components';

function typeToJavascriptType(type) {
  switch (type) {
    case 'integer':
      return 'number';
    case 'string':
      return 'text';
    default:
      return type;
  }
}
function RunEndpointForm({ parameters }) {
  function componentForParameter(parameter) {
    const name = `${parameter.name} - ${parameter.description}`;

    switch (parameter.type) {
      // TODO: add inputs for different cases
      case 'integer':
      case 'string':
        return (
          <FormInput
            id={parameter.name}
            placeholder={name}
            required={parameter.required}
            type={typeToJavascriptType(parameter.type)}
          />
        );
      default:
        return (
          <FormInput
            placeholder={`Input type "${parameter.type}" not yet supported`}
            disabled
            required={parameter.required}
          />
        );
    }
  }

  return (
    <Card>
      <CardHeader className="border-bottom p-0">
        <h4 className="text-center m-0 mt-2">Parameters</h4>

        <p className="text-center text-light m-0 mb-2">
          Fill to make request from browser
        </p>
      </CardHeader>

      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                {parameters.map((parameter, idx) => (
                  <FormGroup key={idx}>
                    <label htmlFor="feInputAddress2">
                      {parameter.name} ({parameter.type}
                      {parameter.format ? ` ${parameter.format}` : ''})
                      {parameter.required ? '*' : ''}
                    </label>
                    {componentForParameter(parameter)}
                  </FormGroup>
                ))}

                <Button type="submit">Make Request</Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}

RunEndpointForm.propTypes = {
  parameters: PropTypes.array,
};

export default RunEndpointForm;
