import React from 'react';
import PropTypes from 'prop-types';

const TextFieldInput = ({
  placeholder,
  name,
  type,
  value,
  onchange,
  errors
}) => (
  <div className="form-group">
    <input
      type={type}
      className={`form-control form-control-lg ${errors ? 'is-invalid' : ''}`}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onchange}
    />
    {errors && <div className="invalid-feedback">{errors}</div>}
  </div>
);

TextFieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  errors: PropTypes.string,
  type: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired
};

TextFieldInput.defaultProps = {
  type: 'text'
};

export default TextFieldInput;
