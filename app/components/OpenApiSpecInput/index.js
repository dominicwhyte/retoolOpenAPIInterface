/**
 *
 * OpenApiSpecInput
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormTextarea,
  Button,
} from 'shards-react';

function OpenApiSpecInput({ onConfirm, originalSpecs }) {
  const [specsText, setSpecsText] = React.useState(originalSpecs);

  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Provide your OpenAPI Specification (JSON)</h6>
        <div className="block-handle" />
      </CardHeader>
      <CardBody>
        <Form>
          <FormTextarea
            cols="30"
            rows="6"
            className="mb-3"
            style={{ minHeight: '150px' }}
            value={specsText}
            onChange={event => {
              setSpecsText(event.target.value);
            }}
          />
          <Button
            type="button"
            size="sm"
            theme="accent"
            onClick={() => {
              onConfirm(specsText);
            }}
          >
            Save
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}

OpenApiSpecInput.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  originalSpecs: PropTypes.string.isRequired,
};

export default OpenApiSpecInput;
