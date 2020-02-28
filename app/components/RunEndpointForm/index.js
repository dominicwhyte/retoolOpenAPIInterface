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
  FormTextarea,
  FormSelect,
  Collapse,
  Card,
  CardHeader,
  Button,
} from 'shards-react';
import ReactJson from 'react-json-view';
import { PulseLoader } from 'react-spinners';

import PropTypes from 'prop-types';
// import styled from 'styled-components';

import isJsonString from '../../utils/isJsonString';

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
function RunEndpointForm({
  parameters,
  onExecuteEndpoint,
  requestResponse,
  requestLoading,
}) {
  function componentForParameter(parameter) {
    const name = `${parameter.name} - ${parameter.description}`;
    console.log('parameter', parameter);
    switch (parameter.type) {
      // TODO: add inputs for different cases
      case 'integer':
      case 'string':
        return (
          <FormInput
            id={parameter.name}
            name={parameter.name}
            placeholder={name}
            required={parameter.required}
            type={typeToJavascriptType(parameter.type)}
          />
        );
      case 'array': {
        if (parameter.in === 'query') {
          return (
            <FormTextarea
              id={parameter.name}
              name={parameter.name}
              defaultValue={
                parameter.items && parameter.items.enum
                  ? parameter.items.enum.join(', ')
                  : 'some,comma,separated,values'
              }
              placeholder={name}
              required={parameter.required}
              type={typeToJavascriptType(parameter.type)}
            />
          );
        }
        break;
      }
      case undefined:
        {
          const isJsonSchemaType =
            parameter.schema.type === 'object' ||
            parameter.schema.type === 'array';
          if (parameter.schema && isJsonSchemaType) {
            const defaultValue =
              parameter.schema.type === 'object'
                ? '{\n"someKey": "someValue"\n}'
                : '[{\n"someKey": "someValue"\n}]';
            return (
              // TODO: should be a json editor eventually
              <FormTextarea
                id={parameter.name}
                name={parameter.name}
                defaultValue={defaultValue}
                placeholder={name}
                required={parameter.required}
                type={typeToJavascriptType(parameter.type)}
              />
            );
          }
        }
        break;
      default:
        break;
    }
    return (
      <FormInput
        placeholder={`Input type "${parameter.type}" not yet supported`}
        name={parameter.name}
        disabled
        required={parameter.required}
      />
    );
  }

  console.log('params', parameters);
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
              <Form onSubmit={onExecuteEndpoint}>
                {parameters.map((parameter, idx) => (
                  <FormGroup key={idx}>
                    <label htmlFor="feInputAddress2">
                      {parameter.name} (
                      {parameter.type
                        ? parameter.type
                        : parameter.schema
                          ? parameter.schema.type
                          : 'Unknown type'}
                      {parameter.format ? ` ${parameter.format}` : ''})
                      {parameter.required ? '*' : ''}
                    </label>
                    {componentForParameter(parameter)}
                  </FormGroup>
                ))}

                <Button type="submit" disabled={requestLoading}>
                  {requestLoading ? (
                    <PulseLoader size={5} color="white" />
                  ) : (
                    <div>Make Request</div>
                  )}
                </Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
      <Collapse open={!!requestResponse}>
        {requestResponse && (
          <div className="p-3 mt-3  rounded">
            <h5>Response Code: {requestResponse.status}</h5>
            {isJsonString(requestResponse.result) ? (
              <ReactJson
                src={JSON.parse(requestResponse.result)}
                enableClipboard={false}
              />
            ) : (
              <h6>{requestResponse.result}</h6>
            )}
          </div>
        )}
      </Collapse>
    </Card>
  );
}

RunEndpointForm.propTypes = {
  parameters: PropTypes.array,
  onExecuteEndpoint: PropTypes.func,
  requestLoading: PropTypes.bool,
};

export default RunEndpointForm;
