import React from "react";
import PropTypes from "prop-types";

const NumberFieldInput = ({
  placeholder,
  name,
  type,
  value,
  onchange,
  errors,
  label
}) => {
  return (
    <div className="form-group">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            {label}
          </label>
        </div>
        <input
          type={type}
          className={`form-control form-control-lg ${
            errors ? "is-invalid" : ""
          }`}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onchange}
          min="0"
          step="0.1"
        />
        {errors ? <div className="invalid-feedback">{errors}</div> : ""}
      </div>
    </div>
  );
};

NumberFieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.number,
  label: PropTypes.string,
  errors: PropTypes.string,
  type: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired
};

NumberFieldInput.defaultProps = {
  type: "number"
};

export default NumberFieldInput;
